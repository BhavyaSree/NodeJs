
## What is Node.Js?
Node.Js is a javascript run time built on google's opensource V8 javascript engine.

Node.Js is a javascript run time environment in which a program written in javascript will be executed, but outside of web browser.

V8 Engine executes the javascript code for Node.Js.

With javascript as a standalone environment, we cannot make things like accessing file system and better network capabilities. 
By having Node.Js as a web server, we can finally use javascript on the server side for web development and can access file system. Thus we can build fast and highly scable network applciation for powering back-end for web applications.

## Why to use Node.Js?
* Single threaded, based on event driven, non-blocking I/O model
* Perfect for building super fast and scalable data intensive applications
* Javascript for the entire stack (front and back ends). That makes applications fast and more efficient development.
* Node has huge library of open source packages available called NPM.

## When to use Node.Js?
* API with database behind it (preferbly NoSQL)
* Data Streaming (think Youtube)
* Real-time chat application
* server-side web application

## Not to use Node.Js
Applications with heavy server-side processing (CPU-intensive)


[Download NodeJs](https://nodejs.org/en)

Even version numbers will have long term support. So It's recommended to use even number versions for production.

* To open node repo in terminal -- `node`
* To exit node repo in terminal -- `.exit` or `control+d`
* To view all the global variables available in Node -- Open node repo and give `tab`
* `_+6` -- indicates previous result plus 6, _at start indicates previous result.
* String.`tab` -- gives all the methods we can use on string.
* `Command+k` -- to clear the console.
* To run javascript file in terminal -- `node filename`


## Accessing file system
In order to access file system, we need to use module.  
NodeJs is built on tne concept module where all kinds of additional functionality are stored in a module.  
Reading files can be done with `fs` module.

`const fs = require('fs');`  -- import fs module in variable fs

We can get all the information of different node modules in documentation.  
[Node Documentation](https://nodejs.org/en/docs) Choose the version for right documentation.

readFileSync - Synchronously reads the entire contents of a file.

[Read and Write Files in synchronous way](./index.js)


## Asynchronous nature of NodeJs

Synchronous way of processinf is nothing but each statement is processed one after otehr line by line.  
Each line of code waits for the result of it's previous line. 
This will be problamatic with small operations as each line blocks the execution of it's after code.
Therefore, synchronous code is also called as blocking code.

The solution for this in NodeJs is to use Asynchronous code.

In asynchronous code, we upload heavy work to run in background, once the work is done, a call function that we register before is called to handle the result.  
During this time, the rest of the code can still be executing without being blocked by heavy task, which will be running in the background.
Thus, the code can be non-blocking code.

NodeJs, where our application is running has only one single thread.  
A thread is like a set of instructions running in system CPU. So, thread is where our code is actually executed in processor.  
In NodeJs, there will be only one thread for each application i.e., all the users accessing the application are using same thread.
If one user blocks the thread with synchronous code, then all the other users have to wait for that execution to finish. This will be problem for the application with many users.
Therefore, we use asynchronous way of processing in NodeJs.
Thus, NodeJs will be non-blocking I/O model and we use many callback functions in Node.js.
But callbacks doesn't indicate that we are using asynchronous mode. Only some functions can be run in asynchronous mode not all.

