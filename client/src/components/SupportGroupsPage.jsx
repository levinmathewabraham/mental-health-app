import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar

const SupportGroupsPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Support Groups</h1>
      <p>Find local and online support groups for mental health.</p>

      <section className="resource-section">
        <h2>What Are Support Groups?</h2>
        <p>Support groups are gatherings of individuals who share similar experiences or challenges. They provide a safe space for members to share their feelings, offer support, and learn from one another.</p>
      </section>

      <section className="resource-section">
        <h2>Benefits of Joining a Support Group</h2>
        <ul>
          <li><strong>Emotional Support:</strong> Connect with others who understand your struggles.</li>
          <li><strong>Shared Experiences:</strong> Gain insights from others who have faced similar challenges.</li>
          <li><strong>Accountability:</strong> Stay motivated and committed to your mental health journey.</li>
          <li><strong>Resource Sharing:</strong> Learn about helpful resources and coping strategies.</li>
          <li><strong>Reduced Isolation:</strong> Combat feelings of loneliness and isolation.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Types of Support Groups</h2>
        <p>Support groups can vary widely in focus and format. Here are some common types:</p>
        <ul>
          <li><strong>Peer Support Groups:</strong> Led by individuals with lived experience, these groups focus on sharing personal stories and coping strategies.</li>
          <li><strong>Professional-Led Groups:</strong> Facilitated by mental health professionals, these groups may include structured activities and discussions.</li>
          <li><strong>Online Support Groups:</strong> Virtual meetings that allow participants to connect from anywhere, often through video conferencing platforms.</li>
          <li><strong>Topic-Specific Groups:</strong> Focused on specific issues such as anxiety, depression, grief, or addiction.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>How to Find Support Groups</h2>
        <p>Finding the right support group can be a crucial step in your mental health journey. Here are some ways to locate groups:</p>
        <ul>
          <li><strong>Online Directories:</strong> Websites like <a href="https://www.meetup.com" target="_blank" rel="noopener noreferrer">Meetup</a> and <a href="https://www.mentalhealth.gov" target="_blank" rel="noopener noreferrer">MentalHealth.gov</a> offer listings of local and online support groups.</li>
          <li><strong>Community Centers:</strong> Check with local community centers, hospitals, or mental health clinics for group offerings.</li>
          <li><strong>Social Media:</strong> Many support groups have a presence on platforms like Facebook, where you can join private groups for support.</li>
          <li><strong>Therapist Recommendations:</strong> Ask your therapist or counselor for recommendations on support groups that may be beneficial for you.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>What to Expect in a Support Group</h2>
        <p>Support groups can vary in structure, but here are some common elements you might encounter:</p>
        <ul>
          <li><strong>Introductions:</strong> Members often introduce themselves and share their reasons for attending.</li>
          <li><strong>Sharing Time:</strong> Participants take turns sharing their experiences and feelings.</li>
          <li><strong>Facilitated Discussions:</strong> A facilitator may guide discussions and encourage participation.</li>
          <li><strong>Confidentiality:</strong> Respect for privacy is crucial; what is shared in the group should stay in the group.</li>
          <li><strong>Resources and Tools:</strong> Groups may provide handouts, worksheets, or recommendations for further reading.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Online Support Group Resources</h2>
        <p>Here are some reputable online platforms where you can find virtual support groups:</p>
        <ul>
          <li><a href="https://www.7cups.com" target="_blank" rel="noopener noreferrer">7 Cups</a>: Offers free online chat with trained listeners and support groups.</li>
          <li><a href="https://www.nami.org" target="_blank" rel="noopener noreferrer">NAMI (National Alliance on Mental Illness)</a>: Provides information on local and online support groups.</li>
          <li><a href="https://www.supportgroups.com" target="_blank" rel="noopener noreferrer">SupportGroups.com</a>: A platform for various support groups covering different topics.</li>
          <li><a href="https://www.reddit.com/r/mentalhealth" target="_blank" rel="noopener noreferrer">Reddit Mental Health Community</a>: An online community where users can share experiences and support each other.</li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Conclusion</h2>
        <p>Joining a support group can be a valuable step in your mental health journey. Whether you choose to participate in-person or online, the connections and support you find can make a significant difference in your well-being.</p>
      </section>
    </div>
  );
};

export default SupportGroupsPage;
