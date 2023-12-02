use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashMap;

fn remove_chars(input_str: &str, chars_to_remove: &[char]) -> String {
    let result: String = input_str.chars().filter(|&c| !chars_to_remove.contains(&c)).collect();
    result
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn find_solution()
{
    let mut solution: i32 = 0;
    let mut solution_part_2: i32 = 0;
    let color_map: HashMap<String, i32> = vec![
    ("red".to_string(), 12),
    ("green".to_string(), 13),
    ("blue".to_string(), 14)
    ]
    .into_iter()
    .collect();

    for key in color_map.keys() {
        println!("Key: {}", key);
    }
    let input_file_name :&str = "input.txt";
    println!("In file {}", input_file_name);

    if let Ok(lines) = read_lines(input_file_name) {
        let mut game_id: i32 = 1;
        for line in lines {
            if let Ok(ip) = line {
                let game_vector: Vec<&str> = ip.split('.').collect();
                let mut game_is_playable: bool = true; 
                let mut color_scores : HashMap<String, i32> = vec![
                    ("red".to_string(), 1),
                    ("green".to_string(), 1),
                    ("blue".to_string(), 1)
                    ]
                    .into_iter()
                    .collect();
                for game in game_vector {
                    println!("{}", game);
                    let words: Vec<&str> = game.split_whitespace().collect();

                    let mut iter = words.iter();
                    while let Some(number_str) = iter.next()
                    {
                        if let Some(color) = iter.next()
                        {
                            if let Ok(number) = number_str.parse::<i32>() {
                                let chars_to_remove = [',',';'];
                                let clean_color = remove_chars(color, &chars_to_remove);
                                println!("key {clean_color} ");
                                if color_map[&clean_color] < number {
                                    println!("game is not playable because color {color} has value {number}");
                                    game_is_playable = false; 
                                }
                                let curr_val = color_scores.get(&clean_color);
                                color_scores.insert(clean_color, number.max(*curr_val.unwrap()));
                            }
                        }
                    }
                }
                if game_is_playable {
                    solution+=game_id; 
                }
                game_id+=1; 
                let mut product: i32 = 1;
                for (_, value) in &color_scores {
                    product *= value; 
                }
                solution_part_2 += product;
            }
        }
    }
    println!("Solution is {solution}");
    println!("Part 2 solution is {solution_part_2}");
}

fn main() {
    find_solution();
}
