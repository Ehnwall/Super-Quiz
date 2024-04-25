type WelcomeProps = {
    nextScreen: () => void;
};

const Welcome = (props: WelcomeProps) => {
    return (
        <section>
            <h2>Welcome to the Quiz!</h2>
            <p>Do you want to start?</p>
            <button onClick={props.nextScreen}>Start th quiz</button>
        </section>
    );
};

export default Welcome;
