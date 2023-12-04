package src.main.java.com.day4;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class part2 {
    
    final static String filePath = "input.txt"; 
    final static Map<Integer, Integer> numCardsObtained = new HashMap<>();
    
    public static int solvePart2() {
        int solution = 0;
         try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int cardNum = 0;
            while ((line = reader.readLine()) != null) {

                String[] parts = line.split("\\|");
                String[] givenCardsSplit = parts[0].split(":");
                String[] givenCards = givenCardsSplit[1].split(" ");
                String[] winningCards = parts[1].split(" ");

                int numMatchingCards = findNumMatchingCards(givenCards, winningCards, cardNum);

                int currentNumCardsObtained = 1;
                if (numCardsObtained.containsKey(cardNum))
                {
                    currentNumCardsObtained = numCardsObtained.get(cardNum);
                }
                for (int i = cardNum + 1; i <= cardNum + numMatchingCards; i++)
                {
                    if (numCardsObtained.containsKey(i)) {
                        int currentValue = numCardsObtained.get(i);
                        numCardsObtained.put(i, currentValue +  currentNumCardsObtained);
                    } else {
                        numCardsObtained.put(i, 1 + currentNumCardsObtained);
                    }
                }
               
                cardNum++; 
            }

            for (int currCardNum = 0; currCardNum < cardNum; ++currCardNum) {
                 if (numCardsObtained.containsKey(currCardNum)) { 
                    solution += numCardsObtained.get(currCardNum);
                 } else {
                    solution += 1;
                 }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return solution;
    }

    private static int findNumMatchingCards(String[] winningNums, String[] givenNums, int cardNum) {
        int points = 0;

        for (String winningNum : winningNums) {
            if (Arrays.asList(givenNums).contains(winningNum) && !winningNum.equals("")) {
                points++;
            }
        }
        return points; 
    }
}
