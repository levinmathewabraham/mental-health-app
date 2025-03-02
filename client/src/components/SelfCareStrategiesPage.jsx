import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar

const SelfCareStrategiesPage = () => {
  return (
    <div>
        <Navbar />
      <h1>Self-Care Strategies</h1>
      <p>Explore various self-care strategies to improve your mental well-being.</p>

      <section className="resource-section">
        <h2>Mindfulness and Meditation</h2>
        <p>Practicing mindfulness and meditation can help you stay present and reduce stress. Consider trying:</p>
        <ul>
          <li>Guided meditation apps like Headspace or Calm.</li>
          <li>Deep breathing exercises to calm your mind.</li>
          <li>Mindful walking or yoga to connect with your body.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Physical Activity</h2>
        <p>Regular physical activity is essential for mental health. Aim for at least 30 minutes of exercise most days. Options include:</p>
        <ul>
          <li>Walking, jogging, or cycling in nature.</li>
          <li>Joining a local sports team or fitness class.</li>
          <li>Practicing yoga or dance for both physical and mental benefits.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Healthy Eating</h2>
        <p>Nutrition plays a significant role in mental health. Focus on a balanced diet that includes:</p>
        <ul>
          <li>Fruits and vegetables for essential vitamins and minerals.</li>
          <li>Whole grains for sustained energy.</li>
          <li>Lean proteins and healthy fats to support brain function.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Social Connections</h2>
        <p>Maintaining strong social connections can improve your mood and reduce feelings of isolation. Consider:</p>
        <ul>
          <li>Reaching out to friends or family regularly.</li>
          <li>Joining clubs or groups that share your interests.</li>
          <li>Volunteering in your community to meet new people.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Sleep Hygiene</h2>
        <p>Quality sleep is crucial for mental health. Improve your sleep hygiene by:</p>
        <ul>
          <li>Establishing a regular sleep schedule.</li>
          <li>Creating a relaxing bedtime routine.</li>
          <li>Avoiding screens and caffeine before bed.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Creative Outlets</h2>
        <p>Engaging in creative activities can be therapeutic. Try:</p>
        <ul>
          <li>Journaling to express your thoughts and feelings.</li>
          <li>Painting, drawing, or crafting to explore your creativity.</li>
          <li>Playing a musical instrument or singing to lift your spirits.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Professional Help</h2>
        <p>Sometimes, self-care strategies may not be enough. Don't hesitate to seek professional help if needed. Consider:</p>
        <ul>
          <li>Talking to a therapist or counselor.</li>
          <li>Joining support groups for shared experiences.</li>
          <li>Exploring online therapy options for convenience.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Setting Boundaries</h2>
        <p>Learning to say no and setting boundaries is essential for self-care. Practice:</p>
        <ul>
          <li>Identifying your limits and communicating them clearly.</li>
          <li>Prioritizing your needs and well-being over obligations.</li>
          <li>Taking breaks when feeling overwhelmed.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Gratitude Practice</h2>
        <p>Practicing gratitude can shift your focus to the positive aspects of life. Try:</p>
        <ul>
          <li>Keeping a gratitude journal to write down things you are thankful for.</li>
          <li>Sharing your gratitude with others to strengthen relationships.</li>
          <li>Reflecting on positive experiences at the end of each day.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Digital Detox</h2>
        <p>Taking breaks from screens can help reduce stress and anxiety. Consider:</p>
        <ul>
          <li>Setting specific times to unplug from devices.</li>
          <li>Engaging in offline activities like reading or hiking.</li>
          <li>Limiting social media use to avoid comparison and negativity.</li>
        </ul>
      </section>
    </div>
  );
};

export default SelfCareStrategiesPage;
