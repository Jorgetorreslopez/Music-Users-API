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
  <p>To begin, run the following command:</p>
  <pre><code>npm run dev</code></pre>
  <p>The application should now be running on <code>http://localhost:3000</code>. You should be seeing a message in your terminal that says the following: <code>"Andre 3000"</code>, which states that your app is connected, and <code>"MONGO ON"</code>, which states that your MONGODB database is connected</p>

<p>Once connected, run the following command to add a collection of songs to your database that you can user for this API:</p>
  <pre><code>npm run database</code></pre>
<p>This starts your app without DEV mode. More about this in the "Testing" section. </p>

<h2>API Requests in Postman</h2>
<p>To make an API request using Postman:</p>
<ol>
  <li>Open Postman.</li>
  <li>Make sure your server is running locally on <code>http://localhost:3000</code>.</li>
  <li>Set the request method (GET, POST, PUT, DELETE). Start with Creating a user first to save the webtoken for later use.</li>
  <li>Enter the request URL based on the endpoints shown in the routes folders. Make sure to pay attention to which routes require Authorization via Webtoken.</li>
  <li>Set the necessary request headers, body(raw, JSON), and, if required, authentication.</li>
  <li>Enter any required information in JSON object format depending on the endpoint in the req.body.</li>
  <li>Click Submit</li>
</ol>
<p>Lets create a user together.</p>
<ol>
  <li>In the url: enter <code>http://localhost:3000/users</code></li>
  <li>Set the HTTP request to <strong>POST</strong></li>
  <li>In the request body, select the <strong>raw</strong> option and choose <strong>JSON</strong> from the dropdown.</li>
  <li><p>Enter the following JSON object as the request body:</p>
<pre><code>{
  "username": "marthastewartknows",
  "email": "test@marthaskitchen.com",
  "password": "thisismartha",
}</code></pre></li>
  <li>Click the <strong>Send</strong> button to submit the request and you should recieve an object for your new user in the response.body.</li>
</ol>

<h2>Testing</h2>
<p>To test routes with Supertest/Jest:</p>
<ol>
  <li>Ensure the app is not running. If unsure enter the following in the terminal: <code>pkill node</code> </li>
  <li>Execute the following commands:</li>
</ol>
<p>To test All routes:</p>
<pre><code>npm run testAll</code></pre>
<p>To test User routes only:</p>
<pre><code>npm run testUser</code></pre>
<p>To test Playlist routes only:</p>
<pre><code>npm run testPlaylist</code></pre>
<p>To test Song routes only:</p>
<pre><code>npm run testSong</code></pre>

<p>To test routes with Artillery:</p>
<ol>
<li>Turn your app on in DEV mode by entering the following command:</li>
<pre><code>npm run dev:load</code></pre>
<li>Execute the following commands based on the routes you want to test:</li>
<pre><code>
  load:createUser
  load:deleteUser
  load:getUsers
  load:loginUser
  load:logoutUser
  load:updateUser
  load:createPlaylist
  load:addSong
  load:removeSong
  load:deletePlaylist
  load:editPlaylist
  load:showAllPlaylists
  load:getSongs</code></pre>
</ol>

<h2>Trello</h2>
<a href="https://trello.com/invite/b/kHnvxM6Z/ATTI65a35541391076abd9c55c147d30c25dCC66C9EE/music-playlist-api">Click Here for Trello Board Info</a>
