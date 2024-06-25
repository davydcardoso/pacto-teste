FROM maven:3.8.4-amazoncorretto-17 AS build

COPY src /app/src
COPY pom.xml /app

WORKDIR /app
RUN mvn clean install

FROM tomcat:9.0-jdk17-temurin

COPY --from=build /app/target/teste-backend-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/app.war

EXPOSE 8080:8081
