package src.main.java.com.day4;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;

public class part1 {
    
    final static String filePath = "input.txt"; 

    public static int solvePart1() {
        int solution = 0;

         try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = reader.readLine()) != null) {

                String[] parts = line.split("\\|");
                String[] givenCardsSplit = parts[0].split(":");
                String[] givenCards = givenCardsSplit[1].split(" ");
                String[] winningCards = parts[1].split(" ");

                solution += getPointsForCard(givenCards, winningCards);
                
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return solution;
    }

    private static int getPointsForCard(String[] winningNums, String[] givenNums) {
        int points = 1;

        for (String winningNum : winningNums) {
            if (Arrays.asList(givenNums).contains(winningNum) && !winningNum.equals("")) {
                points *= 2;
            }
        }
        return points / 2; 
    }
}
