<h1>Music Playlist API</h1>
<h2>Prerequisites</h2>
<ul>
<li><a href="https://nodejs.org">Node.js</a></li>
<li><a href="https://www.mongodb.com/cloud/atlas/register">MongoDB Atlas Database</a> (This API uses code pertaining to Mongo Databases) </li>
<li><a href="https://www.npmjs.com/package/nodemon">Nodemon</a> (Optional but recommended. If you choose not to use nodemon skip to "Getting Started")</li>

</ul>
<p>Install Nodemon globally by doing the following:
<ol>
  <li>Open your command prompt or terminal</li>
   <li>Run the following Command:</li>
</ol></p>
   <pre><code>npm install -g nodemon</code></pre>

<h2>Getting Started</h2>
   <ol>
    <li>Clone this repository to your machine.</li>
    <li>Install project dependencies by running <code>npm install</code>. Remember to make sure Node.Js is installed to be able to use <code>npm install</code>.</li>
    <li><code>touch .env</code> file in the root directory of your project.</li>
    <li>In <code>.gitignore</code> add the following to keep your proprietary data hidden when pushing to GITHUB: <code>nodemodules/</code> & <code>.env</code></li>
    <li>In the <code>.env</code> file, create variables for your MONGODB connection string & for your Webtoken Secret Key. Here's an example:</li>
  </ol>
  <pre><code>
    MONGO_URI=mongodb://your-mongodb-uri
    SECRET=your-secret-key
  </code></pre>

  <h2>Using The Music Playlist API</h2>
  <p>To begin setting up your account to create playlists, run the following command:</p>
  <pre><code>npm run dev</code></pre>
  <p>The application should now be running on <code>http://localhost:3000</code>. You should be seeing a message sure </p>
