# Security Tools

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://spdx.org/licenses/MIT.html)
[![Twitter](https://img.shields.io/twitter/follow/tldrrun.svg?style=social&label=Follow)](https://twitter.com/tldrrun)

[https://tools.tldr.run](https://tools.tldr.run)

Curated list of security tools for Hackers & Builders!

[![Security Tools | https://tools.tldr.run](./security-tools.jpg)](https://tools.tldr.run)

## Development & Setup

* Navigate to the code directory and run the following commands to install packages and serve

```bash
npm install
npm run serve
```

* Navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Docker based setup

* Run the following commands to setup using docker

```bash
git clone https://github.com/tldrrun/tools.tldr.run.git
cd tools.tldr.run
docker build -t tldrrun/tools-tldr-run .
docker run -d --name tools-tldr-run -p 1234:8080 tldrrun/tools-tldr-run
```

* Navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Contributing

### Tool Submission

* The simplest way to contribute is adding new tools using [Google Form](https://forms.gle/yWbXkBtsDtqAqnTd6)
* Else, you can also make a pull request by following below steps
  * Fork the repository
  * Add new tool under `tools` folder with new tool name as filename (Example: `docker.json`)
  * The file schema should contain as follows. `name`, `description`, `tags`, `operating_system`, `availability` and `url` are mandatory

```json
{
    "name": "Docker",
    "description": "Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.",
    "tags": [
        "containers",
        "devops",
        "automation",
        "golang"
    ],
    "operating_systems": [
        "linux",
        "mac",
        "windows"
    ],
    "license": "Apache-2",
    "availability": [
        "opensource",
        "free",
        "commercial"
    ],
    "github_url": "https://github.com/docker/docker-ce",
    "url": "https://www.docker.com/"
}
```

* Submit the merge request
* Happy contribution and thank you so much.

## Thanks & Acknowledgements

* [Varun A P](https://github.com/apvarun)
* [Madhu Akula](https://github.com/madhuakula)
