import random 

languages = {
        "C" : 3,
        "Python" : 3,
        "Java" : 1,
        "Golang" : 5,
        "Rust" : 5,
        "Typescript" : 3, 
        "Ocaml" : 3, 
        "PHP" : 2
    }

result_sum = sum(val for val in languages.values())
target = random.randint(0, result_sum)

print(f"Todays language is : {next((lang for lang, value in languages.items() if (target := target - value) < 0), None)}")




