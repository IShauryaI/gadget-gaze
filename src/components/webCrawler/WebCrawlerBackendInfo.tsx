
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const WebCrawlerBackendInfo: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Spring Boot Backend Integration</CardTitle>
          <CardDescription>
            How to integrate your Java implementation with the GadgetGaze web crawler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Backend Required</AlertTitle>
            <AlertDescription>
              The web crawler currently uses simulated data. Follow these steps to connect your Java backend.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Spring Boot Setup Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create a new Spring Boot project in IntelliJ using Spring Initializr</li>
              <li>Add the following dependencies: Spring Web, Spring Data JPA, and H2 Database</li>
              <li>Add the JSoup dependency to your pom.xml file</li>
              <li>Create the Java classes for WebCrawler, HTMLParser, SpellChecker, FrequencyCount, WordCompletion, and SearchFrequency</li>
              <li>Create REST controllers that expose these functionalities as APIs</li>
              <li>Configure CORS to allow requests from your React frontend</li>
              <li>Update the WebCrawlerService.ts file to point to your actual backend endpoints</li>
            </ol>

            <h3 className="text-lg font-semibold mt-6">Sample Spring Boot Controller</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`@RestController
@RequestMapping("/api/crawler")
@CrossOrigin(origins = "http://localhost:3000")
public class CrawlerController {

    private final WebCrawlerService webCrawlerService;

    public CrawlerController(WebCrawlerService webCrawlerService) {
        this.webCrawlerService = webCrawlerService;
    }

    @PostMapping("/crawl")
    public ResponseEntity<CrawlResult> crawlWebsite(@RequestBody CrawlRequest request) {
        return ResponseEntity.ok(webCrawlerService.crawlWebsite(request.getUrl()));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<CrawlStatus> getCrawlStatus(@PathVariable String id) {
        return ResponseEntity.ok(webCrawlerService.getCrawlStatus(id));
    }
}`}
            </pre>

            <h3 className="text-lg font-semibold mt-6">pom.xml Dependencies</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.jsoup</groupId>
        <artifactId>jsoup</artifactId>
        <version>1.15.3</version>
    </dependency>
</dependencies>`}
            </pre>
          </div>

          <div className="flex justify-center mt-6">
            <Link to="/crawler">
              <Button>
                Go Back to Web Crawler
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebCrawlerBackendInfo;
