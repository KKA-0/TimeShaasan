![logoFull](https://github.com/KKA-0/TimeShaasan/assets/85556603/81a3b7d9-003a-4ab7-87b2-887533089d12)

[![wakatime](https://wakatime.com/badge/user/ea9792e5-799b-44a2-a25f-c28679dbaa38/project/018c0095-f87d-4329-bf40-35b1e07df5ea.svg)](https://wakatime.com/badge/user/ea9792e5-799b-44a2-a25f-c28679dbaa38/project/018c0095-f87d-4329-bf40-35b1e07df5ea)



<details open><summary>Introduction</summary>
The Initiative to Become The King of your Time, The name "Time Shaasan" is inspired by hindi word "Shaasan/शासन" which means Rule. Time Shaasan Aims to Allow it's users to Control/Organize there time Effectively with many inbuilt Features. 
</details>

<details open><summary>Set up Locally</summary>

### Setup Locally - Monolithic
> Reminder: Clone the Repo, Remember to Setup Environmental Variables in client and server by creating .env file refer example.env.
which consist of MongoDB Connection string & Commenting Microservice Variables in Client env.

Starting Client [ React  ]
```
cd Client && npm i && npm start
```

Starting Node Server [ Node, Express ]
```
cd Server && npm i && npm start
```

### Setup Locally - Microservice

> Reminder: The Following commands Requires Docker and Docker Compose to be installed.


Starting All Microservices, Databases, Kafka and Nginx
```
docker-compose -f docker-compose.local.yml up
```

### Deploy - Microservice
> Reminder: The Following commands Requires Docker and Docker Compose to be installed. This does not Requires Github repository to be cloned locally.

Following Fetches the Latest Images from DockerHub.

```
cd Docker && docker-compose -f docker-compose.prod.yml up
```


</details>

<details open><summary>Architecture</summary>

<img width="2426" alt="TimeShaasan Re-Arch Microservice(1)" src="https://github.com/KKA-0/TimeShaasan/assets/85556603/f13b0e68-d4c2-4e24-bcae-9ea1d7d0b18a">

https://www.figma.com/file/9CMOVhCx5UkOH0d5CMTlEA/TimeShaasan-Re-Arch-Microservice?type=whiteboard&node-id=0%3A1&t=EYJhgKNjSoJcoThB-1

![diagram-export-2-22-2024-1_30_49-AM](https://github.com/KKA-0/TimeShaasan/assets/85556603/bf56336f-3bea-4111-a4f1-45da6aff84ed)

https://app.eraser.io/workspace/uhSZ0IqvGzA438I76crt?origin=share
  
</details>
