import { useEffect, useState } from "react";

type WelcomeProps = {
    nextScreen: (category: string) => void;
};

const Welcome = ({ nextScreen }: WelcomeProps) => {
    const [categories, Setcategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://opentdb.com/api_category.php");
            const data = await response.json();
            const categoryList = data.trivia_categories.map((category: any) => category.name);
            Setcategories(categoryList);
        } catch (error) {
            console.error("error fetching categories", error);
        }
    };

    const handleStartQuiz = () => {
        if (selectedCategory) {
            nextScreen(selectedCategory);
        } else {
            alert("Please select a category to start the quiz!");
        }
    };
    return (
        <section>
            <h2>Welcome to the Quiz!</h2>
            <p>Choose a category</p>
            <select title="select a category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button onClick={handleStartQuiz}>Start the quiz</button>
        </section>
    );
};

export default Welcome;
