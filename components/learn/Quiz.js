import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Vibration } from "react-native";
import CustomText from "../../components/CustomText";
import Svg, { Rect, Circle } from "react-native-svg";
import QuizHeader from "../../components/learn/QuizHeader";
import QuizButton from "../../components/learn/QuizButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
//shuffle here maybe

const Quiz = ({ questions, onGoBack }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const numQuestions = questions.length;
    const [numIncorrect, setIncorrect] = useState(0);
    const [incorrectOne, setIncorrectOne] = useState(0);
    const [incorrectTwo, setIncorrectTwo] = useState(0);
    const [visitedOne, setVisitedOne] = useState(0);
    const [visitedTwo, setVisitedTwo] = useState(0);

    //below is where we can add animations for correct/incorrect answers etc
    const handleAnswerButtonClick = (isCorrect) => {
        if (
            currentQuestion + 1 < questions.length &&
            visitedOne == 0 &&
            visitedTwo == 0
        ) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (numIncorrect > 0 && visitedOne == 0) {
            setCurrentQuestion(incorrectOne);
            setVisitedOne(1);
        } else if (numIncorrect == 2 && visitedTwo == 0) {
            setCurrentQuestion(incorrectTwo);
            setVisitedTwo(1);
        } else {
            if (score + 1 == numQuestions && isCorrect === false) {
                setShowScore(false);
            } else {
                setShowScore(true);
            }
        }

        if (isCorrect === true) {
            if (score + 1 == numQuestions) {
                setShowScore(true);
            } else {
                setScore(score + 1);
            }
        } else {
            Vibration.vibrate();
            //TODO: include pop up that says, incorrect, correct answer was _, will need to pass in diff parameter
            if (numIncorrect == 0) {
                setIncorrectOne(currentQuestion);
            } else if (numIncorrect == 1) {
                setIncorrectTwo(currentQuestion);
            } else if (numIncorrect == 2) {
                setShowScore(true);
            }
            setIncorrect(numIncorrect + 1);
        }
    };

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    const postGameProtocol = () => {
        //ifWin (score == numQuestions)
        //what to display-- games resources
        //update the currSavingsGame
        //update the savings progress bar
        //add coins to coin total
        //ifLose (score < numQuestions)
        //what to display-- retake quiz or exit
    };

    //when icon is pushed, we must reset variables: score, currentQuestion
    const restartQuiz = () => {};

    //do open or closed hearts
    const heartsIncorrect = [
        <View style={{ flexDirection: "row" }}>
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
        </View>,
        <View style={{ flexDirection: "row" }}>
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="hearto"
                size={24}
                color="#F75959"
            />
        </View>,
        <View style={{ flexDirection: "row" }}>
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="heart"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="hearto"
                size={24}
                color="#F75959"
            />
            <AntDesign
                style={{ marginLeft: 4, marginRight: 4 }}
                name="hearto"
                size={24}
                color="#F75959"
            />
        </View>,
        //{handleAnswerButtonClick('false')}
    ];

    return (
        //shuffle here
        <View style={styles.container}>
            {showScore ? (
                <View style={styles.scoreContainer}>
                    <Text style={styles.headerText}>Good job!</Text>
                    <Text style={styles.scoreText}>
                        You scored {score + 1} out of {questions.length}
                    </Text>
                    <Pressable
                        onPress={onGoBack}
                        style={styles.goBackButton}>
                        <Text style={styles.goBackButtonText}>Go Back</Text>
                    </Pressable>
                </View>
            ) : (
                <>
                    <View>
                        <View style={styles.hearts}>
                            {heartsIncorrect[numIncorrect]}
                        </View>
                        <View>
                            {
                                <QuizHeader
                                    score={score}
                                    numQuestions={numQuestions}
                                />
                            }
                        </View>
                        <Text style={styles.questionText}>
                            {questions[currentQuestion].questionText}
                        </Text>
                    </View>
                    <View>
                        {questions[currentQuestion].answerOptions.map(
                            (answerOptions) => (
                                <View
                                    style={styles.questionButton}
                                    key={answerOptions.answerText}>
                                    <QuizButton
                                        text={answerOptions.answerText}
                                        onPress={() =>
                                            handleAnswerButtonClick(
                                                answerOptions.isCorrect
                                            )
                                        }
                                    />
                                </View>
                            )
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
        align: "center",
    },
    hearts: {
        alignSelf: "center",
        marginBottom: 10,
    },
    questionText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 24,
    },
    questionButton: {
        marginTop: 8,
        marginBottom: 8,
    },
    scoreContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 32,
        fontWeight: "500",
        textAlign: "left",
        marginBottom: 12,
    },
    scoreText: {
        color: "#D4DFEA",
        fontSize: 20,
        textAlign: "left",
        marginBottom: 24,
        lineHeight: 24,
        fontWeight: "500",
    },
    goBackButton: {
        width: "100%",
        alignSelf: "center",
        height: 40,
        borderRadius: 15,
        backgroundColor: "#69ABE6",
        justifyContent: "center",
        alignItems: "center",
    },
    goBackButtonText: {
		color: "#01101B",
        fontWeight: "700",
        fontSize: 15,
	},
});

export default Quiz;
