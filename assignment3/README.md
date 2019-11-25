# TEST 3

## Question
Suppose we have a single production environment (no staging, dev, or test).
How would you design the development and release process of a web application that makes it possible to release the "master" branch at any time?
How would you manage incrementally developing multiple features in parallel while frequently releasing to production?


## Answer
We will need a mechanism to selectively deliver features to users. 
The idea is: everything is released to production, then it's progressively rolled out to groups of users. We can have a private-beta group, or we can cluster public user by some criteria (geographic, user properties, random, etc).

Regading the implementation, there are a couple of alternatives:

1. to have different instances of the application, some of them referring to the consolidated master branch, others to feature branches. A network element in front of the instance cluster is in charge allowing or denying access to features (a load balancer or api gateway may be the right place);
2. to implement a/b testing inside the app, thus releasing everything in the same instance.

Once in production, features may be either rejected or promoted.

Option 1 will be preferrable as it offers more solid mechanism for both promotions and rejections, but relies heavily on the infrastructure (that is, it cannot be done with a single-instance app). Also, it will need system operations in order for changes to be effective.

Option 2 it's independent of the infrastructure, and both promotions and rejections can be handled without new deployments. Nevertheless, the app takes all the burden of implementing the selettive delivery mechanism. Also, unused branches will need to be pruned manually by developers.
