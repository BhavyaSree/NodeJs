## What is npm?

Node package manager is a command line interface app that automatically come with NodeJs,in which we use to install and manage open source packages.
NPM is also a repository with all the packages.

[NPM](https://npmjs.com)

We always start a new project `npm init` which creates package.json file (configuration file for project)

#### There are two types of packages, we can install through npm and there are two types of installs.

Two types of packages, we can install are
* Simple dependencies
* Developement dependencies

Simple dependencies are packages that contain some code that we will include on own code. The code upon which we built our own code.

Development dependencies are tools for development like webpack or debugger tool. These are not needed for production. Our code doesn't dependent on these. We just use these them to develop our application.

To install a Simple dependency package  
`npm install <packagename>`  
Example: `npm install slugify`
slugify is get a unique string, instead of Id number in query of url.

To install a Developer dependency package  
`npm install <packagename> --save-dev`  
Example: `npm install nodemon --save-dev`   
dev indicates as developer dependency.

* nodeman package, automatically restarts the server when there is a change in code. This can be used as developer dependency.

Two types of installs available are:
* Local Installs
* Global Installs

To install Globally  -- this package will be dependency for all the applications in the system.
`npm install <pakagename> --global`  
Example: `npm install nodemon --global`

* Inorder to run using local dependencies, we need to specify in npm scripts like
<pre>
  "scripts": {
    "start": "nodemon index.js"
  },
</pre>
In terminal to run the code with nodemon
<pre>
npm run start
</pre>

* To get a module which we installed from npm
<pre>
const slugify = require('slugify');
</pre>

## Package Versioning

Symantic version notation: Version numbers is always expressed with three numbers  
* first one - major version  
* second one - minor version  
* third one - patch version  

patch version will be for bug fixes.   
For example in version 1.18.11  
For version 1.18, they found a bug and its fix will be given as 1.18.1
for next bug fix, it will be 1.18.2.  
Minor version introduces new features in the package, but it doesn't include breaking changes. The new changes will be compatable with the old version.  
Major version will only bumped up, whenever it is a huge new release with breaking changes.

In ^1.18.1 -- `^` indicates that we accept only minor and patch updates.  
If we set it to ~1.18.1 -- `~` indcates that we accept only patch updates.   
If we ser it to *1.18.1 -- `*` indicates that we accept all updates.  
(`*` is not recommended, as the new version may have breaking changes, which affects our code)

### How to update package?
`npm outdated` gives a table with outdated packages.  
`npm update <packagename>` to update the package version

To install a specific version of a package  
`npm install <pacakgename>@<versionnumber>`  
Example: npm install slugify@1.0.0

### How to delete package?
`npm uninstall <packagename>`

### How to get node_modules?

When we upload project, there is no need to upload node_modules as the size of node_modules folder will be huge and we can easily get back those whenever we want.

`npm install` gets the node_modules folder.  
This reads our package.json file, read our dependencies and download all those dependencies and keeps in node_modules folder.

## Package-lock.json
This file will have all the versions of all the packages we are using, that includes dependencies of our dependencies.

Whenever we share our project, we need to share package.json and package-lock.json files, as these files are necessary to reconstruct node_modules folder.





