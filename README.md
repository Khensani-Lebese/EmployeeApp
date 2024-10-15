<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 0;
            background-color: #f4f4f4;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #eee;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 4px;
            overflow: auto;
        }
        ul {
            list-style-type: none;
        }
    </style>
</head>
<body>

<h1>Employee App</h1>

<p>Welcome to the Employee App! This project allows you to manage employee data with features for adding, updating, deleting, and viewing employee details.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="technologies-used">Technologies Used</h2>
<ul>
    <li>React</li>
    <li>Node.js</li>
    <li>Express</li>
    <li>MongoDB (or other database)</li>
    <li>Git</li>
    <li>npm (Node Package Manager)</li>
</ul>

<h2 id="getting-started">Getting Started</h2>
<p>To get a copy of the project up and running on your local machine for development and testing purposes, follow these simple steps.</p>

<h2 id="installation">Installation</h2>
<ol>
    <li><strong>Clone the repository</strong>:
        <pre><code>git clone https://github.com/Khensani-Lebese/EmployeeApp.git</code></pre>
    </li>
    <li><strong>Navigate to the project directory</strong>:
        <pre><code>cd EmployeeApp</code></pre>
    </li>
    <li><strong>Install dependencies</strong> for both the client and server:
        <ul>
            <li>For the client (React app):
                <pre><code>cd client</code></pre>
                <pre><code>npm install</code></pre>
            </li>
            <li>For the server (Node.js app):
                <pre><code>cd ../server</code></pre>
                <pre><code>npm install</code></pre>
            </li>
        </ul>
    </li>
</ol>

<h2 id="running-the-application">Running the Application</h2>
<ol>
    <li><strong>Start the server</strong>:
        <pre><code>npm start</code></pre>
    </li>
    <li><strong>Start the client</strong>:
        <pre><code>npm start</code></pre>
    </li>
</ol>
<p>The client will typically run on <code>http://localhost:3000</code> and the server will run on <code>http://localhost:5000</code> (or the port specified in your server configuration).</p>

<h2 id="environment-variables">Environment Variables</h2>
<p>You need to set up some environment variables for your application to run correctly. Create a <code>.env</code> file in the <code>server</code> directory and add the following variables:</p>
<pre><code>
DATABASE_URL=mongodb://your_database_url_here
GOOGLE_SERVICE_ACCOUNT_KEY=your_service_account_key_here
</code></pre>
<p>Make sure to replace the placeholders with your actual database URL and Google Service Account Key.</p>

<h2 id="usage">Usage</h2>
<p>Once both the client and server are running, you can access the Employee App in your web browser at <code>http://localhost:3000</code>.</p>
<p>You will be able to:</p>
<ul>
    <li>Add new employees</li>
    <li>Update employee details</li>
    <li>Delete employees</li>
    <li>View employee list</li>
</ul>

<h2 id="contributing">Contributing</h2>
<p>If you want to contribute to this project, please follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create your feature branch:
        <pre><code>git checkout -b feature/YourFeature</code></pre>
    </li>
    <li>Commit your changes:
        <pre><code>git commit -m 'Add some feature'</code></pre>
    </li>
    <li>Push to the branch:
        <pre><code>git push origin feature/YourFeature</code></pre>
    </li>
    <li>Open a pull request.</li>
</ol>

<h2 id="license">License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
