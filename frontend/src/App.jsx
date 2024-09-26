import React, { useState, useEffect } from "react";
import { Box, Progress, Text, Image, Flex, ScaleFade } from "@chakra-ui/react";
import tapswap from "./assets/tapswap.jpeg";
import bitcoin from "./assets/bitcoin.png";
import "animate.css"; // Assuming animate.css is used for animation

const App = () => {
    const [coinAmount, setCoinAmount] = useState(() => {
        const storedCoinAmount = localStorage.getItem("coinAmount");
        return storedCoinAmount ? Number(storedCoinAmount) : 0;
    });

    const [dynamicTotal, setDynamicTotal] = useState(2000);
    const [totalCoins, setTotalCoins] = useState(dynamicTotal);
    const [showBubble, setShowBubble] = useState(false); // State for showing the bubble
    const [bounce, setBounce] = useState(false); // State for bounce animation

    useEffect(() => {
        localStorage.setItem("coinAmount", coinAmount);
    }, [coinAmount]);

    const handleCoinClick = () => {
        if (totalCoins > 0) {
            setCoinAmount((prevAmount) => prevAmount + 10);
            setTotalCoins((prevTotal) => prevTotal - 10);
            showBubbleMessage(); // Show bubble message
            triggerBounce(); // Trigger bounce animation
        }
    };

    const showBubbleMessage = () => {
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 1000); // Hide bubble after 1 second
    };

    const triggerBounce = () => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500); // Bounce effect lasts for 500ms
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (totalCoins < 2000) {
                setTotalCoins((prevTotal) => Math.min(prevTotal + 10, 2000));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [totalCoins]);

    return (
        <Flex
            align="center"
            justify="center"
            height="700"
            bg="linear-gradient(145deg, #2c2c72, #1f1f4d)"
            mt={6}
            borderRadius="10px"
            ml="550px"
        >
            <Box
                borderRadius="lg"
                color="white"
                p={4}
                textAlign="center"
                width="450px"
                position="relative" // Required for the bubble to position correctly
            >
                <Flex justify="center" align="center" mb={2}>
                    <Box>
                        <Image height="40px" src={bitcoin} mr={2} mt={1} />
                    </Box>
                    <Text fontSize="5xl" fontWeight="bold">
                        {coinAmount} Coins
                    </Text>
                </Flex>

                <Flex justify="center" align="center" mb={4}>
                    <Text fontSize="sm" mr={2}>
                        🏆
                    </Text>
                    <Text fontSize="2xl">Master</Text>
                </Flex>

                {showBubble && (
                    <ScaleFade initialScale={0.9} in={showBubble}>
                        <Box
                            position="absolute"
                            top="20%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            bg="yellow.400"
                            borderRadius="md"
                            p={2}
                            boxShadow="md"
                        >
                            <Text fontWeight="bold">+1 Coin!</Text>
                        </Box>
                    </ScaleFade>
                )}

                {/* Coin Image with bounce animation */}
                <Box
                    mt={70}
                    mb={50}
                    onClick={handleCoinClick}
                    cursor={"pointer"}
                    className={
                        bounce ? "animate__animated animate__bounce" : ""
                    }
                >
                    <Image
                        src={tapswap}
                        alt="Coin"
                        borderRadius="full"
                        width="200px"
                        height="200px"
                        mx="auto"
                    />
                </Box>

                {/* Progress Bar */}
                <Box>
                    <Flex ml={160} mb={2}>
                        <Text fontSize="xl">{totalCoins}</Text>
                        <Text fontSize="xl">/{dynamicTotal}</Text>
                    </Flex>
                    <Progress
                        colorScheme="yellow"
                        size="sm"
                        value={(totalCoins / dynamicTotal) * 100}
                        height="10px"
                        borderRadius={10}
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default App;
