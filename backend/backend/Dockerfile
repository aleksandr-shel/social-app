
#What we are saying here is to go grab an image with a small OS image made for .Net Core. We also say that our working directory is /app.
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

#Next, we need to copy the project file ending in .csproj. Additionally, we also need to call dotnet restore, to ensure we install all specified dependencies, like so:
COPY *.csproj ./
RUN dotnet restore

#Next, we need to copy our app files and build our app, like so:
COPY . ./
RUN dotnet publish -c Release -o out


#Here we again specify our image and our working directory, like so:
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .

#Finally, we add a command for how to start up our app. We do that with the command ENTRYPOINT. ENTRYPOINT takes an array that transforms into a command-line invocation with arguments. Our command looks like so:
ENTRYPOINT ["dotnet", "backend.dll"]