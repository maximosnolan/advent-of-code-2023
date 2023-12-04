package main

import (
	"bufio"
	"fmt"
	"os"
	"unicode"
)

func isSymbol(c rune) bool {
	return !unicode.IsDigit(c) && c != '.'
}


func getNum(i, j int, input [][]rune, visited [][]bool) int32 {
	// go all the way to the left until number ends
	if j < 0 || j >= len(input[0]) || visited[i][j] || !unicode.IsDigit(input[i][j]) {
		return 0
	}

	var startPoint int32 
	for x := j; x >= 0; x -= 1 {
		visited[i][x] = true
		if !unicode.IsDigit(input[i][x]) {
			startPoint = int32(x + 1)
			break
		}
	}

	var solution int32
	for x := startPoint; x < int32(len(input[0])); x += 1 {
		visited[i][x] = true
		if unicode.IsDigit(input[i][x]) {
			solution *= 10
			solution += int32(input[i][x] - '0')
		} else {
			return solution
		}
	}
	return solution
}

func main() {
	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println("Can't open file")
		return
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	var input [][]rune
	var visited [][]bool
	// Advances to next line on each iteration
	for scanner.Scan() {
		line := scanner.Text()
		var stringSlice []rune
		var visitedSlice []bool
		for _, char := range line {
			stringSlice = append(stringSlice, char)
			visitedSlice = append(visitedSlice, false)
		}

		input = append(input, stringSlice)
		visited = append(visited, visitedSlice)
		//fmt.Println(line)
	}
	var solution = 0
	for i := range input {
		for j := range input[i] {
			if isSymbol(input[i][j]) {
				solution += int(getNum(i-1, j-1, input, visited))
				solution += int(getNum(i+1, j+1, input, visited))
				solution += int(getNum(i+1, j-1, input, visited))
				solution += int(getNum(i+1, j, input, visited))
				solution += int(getNum(i, j+1, input, visited))
				solution += int(getNum(i, j-1, input, visited))
				solution += int(getNum(i-1, j+1, input, visited))
				solution += int(getNum(i-1, j, input, visited))
			}
		}
		fmt.Println()
	}
	fmt.Println("Solution is ", solution)
}
