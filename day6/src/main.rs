use std::fs::File;
use std::io::{self, BufRead};


fn determine_ways_to_win(time : i64, distance: i64) -> i32 {
    // 10
    // average speed we have to go assuming you start immediatly 
    // 9 / 7 
    let mut num_ways = 0;

    for curr_time in 0..time {
        let curr_distance = curr_time * (time - curr_time);
        if curr_distance > distance {
            num_ways+=1; 
        }
    }
    return num_ways.max(1);
}

fn read_lines_from_file(file_path: &str) -> Result<(), io::Error> {
    let file = File::open(file_path)?;
    
    let reader = io::BufReader::new(file);

    let mut result: Vec<Vec<i64>> = Vec::new();
    let mut part_two: Vec<i64> = Vec::new();

    for line in reader.lines() {
        match line {
            Ok(content) => {
                let values: Vec<i64> = content
                    .split_whitespace()
                    .filter_map(|s| s.parse().ok())
                    .collect();

                let values_as_str: Result<i64, _> = values
                    .iter()
                    .map(|&num| num.to_string())
                    .collect::<String>()
                    .parse();

                match values_as_str {
                    Ok(value_as_int) => {
                        println!("Parsed int {}", value_as_int);
                        part_two.push(value_as_int)
                    },
                    Err(err) => eprintln!("Error parsing int: {}", err),
                }
                
                result.push(values);

            }
            Err(e) => eprintln!("Error reading line: {}", e),
        }
    }

    let mut solution :i32 = 1;
    for (idx, &time) in result[0].iter().enumerate() {
        println!("Index: {}, time {}, distance {}", idx, time, result[1][idx]);
        solution *= determine_ways_to_win(time,  result[1][idx]);
    }

    println!("Solution to part 1 {}", solution);

    let mut solution_part_2 : i32 = determine_ways_to_win(part_two[0], part_two[1]);

    println!("solution to part 2 {}", solution_part_2);

    Ok(())
}

fn main() {
    
    let file_path = "input.txt";
    let _ = read_lines_from_file(file_path);
}
