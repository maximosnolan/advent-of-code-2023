#include <cctype>
#include <iostream>
#include <fstream>
#include <iterator>
#include <string>
#include <vector>
#include <map>
#include <climits>
#include <algorithm>


std::map<std::string, int> nums =
{
  {"1", 1},
  {"2", 2},
  {"3", 3},
  {"4", 4},
  {"5", 5},
  {"6", 6},
  {"7", 7},
  {"8", 8},
  {"9", 9},
  {"one", 1},
  {"two", 2},
  {"three",3},
  {"four", 4},
  {"five", 5},
  {"six", 6},
  {"seven",7},
  {"eight",8},
  {"nine", 9}
};

[[nodiscard]] int getNumFromLine(std::string& line)
{
  int leftMostVal = 0;
  int leftMostPos = INT_MAX;
  int rightMostVal = 0;
  int rightMostPos = 0;

  for (const auto&  [key, val] : nums)
  {
    std::cout << "searching for " << key << "\n";
    auto startPos = line.find(key); 
      if (leftMostPos >= startPos && startPos != std::string::npos)
      {
        leftMostPos = startPos; 
        leftMostVal = val;
      }
    auto endPos = line.rfind(key); 
      if (rightMostPos <= endPos && endPos != std::string::npos)
      {
        std::cout << "setting rightmost\n";
        rightMostPos = endPos; 
        rightMostVal = val;
      }
    std::cout << " left " << startPos << " | right " << endPos << "\n";
    std::cout << rightMostPos << "\n";
  }

  int num = 0;
  num += leftMostVal;
  num *= 10;
  num += rightMostVal;
  return num; 
}

int main()
{
  std::ifstream file("input.txt");

  if (!file.is_open())
  {
    std::cout << "Unable to open file\n";
    exit(1);
  }

  std::string line;
  int sum = 0;
  while (std::getline(file, line))
  {
    int num = getNumFromLine(line);
    std::cout << "Num is " << num << "\n";
    sum += num;
  }

  std::cout << "FINISHED with sum " << sum << "\n";
}
