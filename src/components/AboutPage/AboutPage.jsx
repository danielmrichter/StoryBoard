function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
          Which technologies did you use? Keep this brief. You don't have to
          list off everything. Technologies used by many students can be
          mentioned quickly without explanation, or summarized. Example: I used
          React, Redux, Node, Express, and Bootstrap. Technologies only a few
          students are familiar with or not everyone used should be given a
          sentence Example: I used the Twilio API to send text messages.{" "}
        </p>
        <br></br>
        <p>
          What was the toughest challenge you overcame? This should be a success
          story. This should not be a complaint or beating yourself up.
          Remember, this is in-part practice for describing your project to
          recruiters and potential employers. Example: The toughest challenge I
          overcame was synchronizing all of the lists accross multiple users so
          that nothing was left off the list or overwritten.
        </p>
        <br></br>
        <p>
          What is the 1 (one) next thing you are excited to tackle This is to
          build excitement around your application. This is not time for you to
          list all of the things you wish you would have accomplished. Only 1
          (ONE) thing should be listed here. Example: Now that the synchronized
          list is working, the next challenge I really excited to tackle push
          notifications to alert my siblings that I'm about to go to the store,
          so they should add items to the list soon!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
