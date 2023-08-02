FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base
WORKDIR /build

# Copy only the project file and restore dependencies first
COPY src/pulse-api/Pulse.Api/Pulse.Api.csproj ./pulse-api/Pulse.Api/
RUN dotnet restore ./pulse-api/Pulse.Api/Pulse.Api.csproj

# Copy the entire source code and build the solution
COPY src/ .
RUN dotnet build ./pulse-api/pulse-api.sln

# Publish the application
RUN dotnet publish ./pulse-api/Pulse.Api -c Release -o /app

# Final stage for running the application
FROM base AS final
WORKDIR /app
COPY --from=base /app .

# Set the entry point and expose the required port
EXPOSE 5003
ENTRYPOINT [ "dotnet", "Pulse.Api.dll" ]
