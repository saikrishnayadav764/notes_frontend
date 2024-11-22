import "./About.styles.css";
const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">
        Achieve Your Goals with Ease: Introducing the Personal Notes App
      </h1>
      <p className="about-description">
        In a world filled with endless Notes, deadlines, and responsibilities,
        staying organized and on top of your notes list can be quite the
        challenge. That's where the React Notes App comes to the rescue. With its
        user-friendly interface, soothing color scheme, and a host of features,
        it's the perfect tool to help you manage your notes and boost your
        productivity.
      </p>

      <h2 className="sub-heading">A Refreshing User Experience</h2>
      <p className="about-description">
        One of the first things you'll notice about the personal notes App is its
        soothing and visually appealing user interface. The calming colors and
        clean design create an environment that encourages focus and
        productivity.
      </p>

      <h2 className="sub-heading">Features That Make a Difference</h2>
      <p className="about-description">
        The app comes packed with features designed to simplify your notes
        management:
      </p>

      <h3 className="feature-heading">1. Notes Creation</h3>
      <p className="about-description">
        Easily create new notes by providing essential details like titles,
        descriptions, due dates, and categories. Whether it's a work-related
        project or a personal goal, you can organize it all in one place.
      </p>

      <h3 className="feature-heading">2. Notes Deletion</h3>
      <p className="about-description">
        Completed a task or decided it's no longer relevant? No problem.
        Deleting notes is a breeze with just a click, allowing you to declutter
        your list effortlessly.
      </p>

      <h3 className="feature-heading">3. Notes Editing</h3>
      <p className="about-description">
        Plans change, and so do notes. The app lets you edit task details,
        ensuring that your list stays up-to-date and reflects your current
        priorities.
      </p>

      <h3 className="feature-heading">4. Notes Alerts</h3>
      <p className="about-description">
        Never miss a deadline again. Set alerts for your notes, and the app will
        remind you at just the right time. Say goodbye to that feeling of "I
        forgot something important!"
      </p>

      <h3 className="feature-heading">5. User Account[Feature Comming Soon]</h3>
      <p className="about-description">
        Create and manage your user account to personalize your experience. Your
        tasks, your way.
      </p>

      <h3 className="feature-heading">6. Search Tasks</h3>
      <p className="about-description">
        Search tasks with any keyword you dont need to type the whole word, just
        type 3-4 words and you will get the results.
      </p>

      <h3 className="feature-heading">7. Organised</h3>
      <p className="about-description">
        You can filter notes as per your convienience
      </p>

      <h3 className="feature-heading">8. Dashboard and Pie Chart</h3>
      <p className="about-description">
        The dashboard provides a quick snapshot of your notes completion status.
        Need a more visual representation? The pie chart gives you an
        at-a-glance view of your notes by category.
      </p>

      <div className="note">
        {" "}
        <b>
          The Personal notes App is your partner in achieving your goals, whether
          big or small. Say goodbye to missed deadlines and disorganized lists.
          With its user-friendly interface and powerful features, you'll be on
          your way to a more productive and organized life in no time. So, why
          wait? Start using the Personal notes app today and take that first step
          towards a more organized and productive you!
        </b>
      </div>
    </div>
  );
};

export default About;
