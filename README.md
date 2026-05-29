# AegisAuth-SecureCloud-User-Threat-Management-System
This project is a centralized, cloud-native user management system on AWS, leveraging Gemini CLI to optimize workflows, secure cross-project integration, and ensure high-availability data retrieval.
The Auth system is a lightweight, cloud-native SIEM and SOAR pipeline. I used S3 as an immutable log lake for security telemetry, and Lambda acts as the analysis and orchestration layer to automatically execute incident response actions when threats are detected.

Using AWS services Ec2, S3, and Lambda, I designed an automated security orchestration and response system that monitors, flags, and alerts on malicious activity:

EC2 (Secure Application Server): Configure EC2 instance to log authentication attempts or application traffic. Run a script on EC2 that aggregates these access logs (like SSH failure logs or application firewall flags) and periodically ships them to S3 for auditing.

S3 (The Secure Log Repository): Immutable security log storage, configuring S3 Bucket Policies, forcing Server-Side Encryption (SSE-KMS), and setting up Object Locking to prevent logs from being altered or deleted by an attacker.

Lambda (The Automated Threat Hunter): Every time a new log file drops into S3, Lambda immediately parses the file. It checks the IP addresses against a public threat intelligence feed or looks for suspicious patterns (multiple failed logins in short period). If it detects a threat, Lambda executes a security action—such as sending an urgent alert notification via Amazon SNS or interacting with the AWS API to dynamically modify the EC2 instance's Security Group to block the malicious IP address entirely.

Other suspicious patterns for Auth: geographic shift, password spraying with common passwords, or sudden burst of database queries at unusual times.

Application and API Level Threats and Infrastructure Anomalies are features that can be implemented later.
