
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileCode, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WebCrawlerBackendInfo: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Spring Boot Backend Integration</CardTitle>
          <CardDescription>
            How to integrate your Java implementation with the GadgetGaze web crawler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Backend Configuration Required</AlertTitle>
            <AlertDescription>
              Follow these steps to connect your Spring Boot backend with the React frontend.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="setup">Setup Guide</TabsTrigger>
              <TabsTrigger value="controller">Controller</TabsTrigger>
              <TabsTrigger value="service">Service Classes</TabsTrigger>
              <TabsTrigger value="model">Data Models</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <h3 className="text-lg font-semibold">Spring Boot Setup Instructions</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Create a new Spring Boot project in IntelliJ using Spring Initializr</li>
                <li>Set the server port to 8081 (to avoid conflicts with the React app)</li>
                <li>Add the following dependencies: Spring Web, Spring Data JPA, H2 Database, and Lombok</li>
                <li>Add the JSoup dependency to your pom.xml file</li>
                <li>Create the Java classes for WebCrawler, HTMLParser, SpellChecker, FrequencyCount, WordCompletion, and SearchFrequency</li>
                <li>Create REST controllers that expose these functionalities as APIs</li>
                <li>Configure CORS to allow requests from your React frontend</li>
              </ol>

              <h3 className="text-lg font-semibold mt-6">application.properties Configuration</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`# Server Configuration
server.port=8081

# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:crawlerdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:8080
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
spring.web.cors.allowed-headers=*

# Crawler Configuration
crawler.max-pages=100
crawler.timeout-seconds=30
crawler.user-agent=Mozilla/5.0 (compatible; GadgetGazeBot/1.0)`}
              </pre>
            </TabsContent>

            <TabsContent value="controller" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">CrawlerController.java</h3>
                <span className="text-xs text-muted-foreground">Path: src/main/java/com/gadgetgaze/crawler/controller/CrawlerController.java</span>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`@RestController
@RequestMapping("/api/crawler")
@CrossOrigin(origins = "http://localhost:8080")
public class CrawlerController {

    private final CrawlerService crawlerService;

    public CrawlerController(CrawlerService crawlerService) {
        this.crawlerService = crawlerService;
    }

    @PostMapping("/crawl")
    public ResponseEntity<CrawlResponse> crawlWebsite(@RequestBody CrawlRequest request,
                                                    @RequestHeader("Authorization") String authHeader) {
        // Extract API key from Authorization header
        String apiKey = authHeader.replace("Bearer ", "");
        
        // Validate API key
        if (!crawlerService.validateApiKey(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid API key"));
        }
        
        try {
            CrawlResponse response = crawlerService.crawlWebsite(request.getUrl());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Error crawling website: " + e.getMessage()));
        }
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<CrawlResponse> getCrawlStatus(@PathVariable String id,
                                                      @RequestHeader("Authorization") String authHeader) {
        // Extract API key
        String apiKey = authHeader.replace("Bearer ", "");
        
        // Validate API key
        if (!crawlerService.validateApiKey(apiKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Invalid API key"));
        }
        
        try {
            CrawlResponse response = crawlerService.getCrawlStatus(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Error getting crawl status: " + e.getMessage()));
        }
    }
}`}
              </pre>
            </TabsContent>

            <TabsContent value="service" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">CrawlerService.java</h3>
                <span className="text-xs text-muted-foreground">Path: src/main/java/com/gadgetgaze/crawler/service/CrawlerService.java</span>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`@Service
public class CrawlerService {

    private final WebCrawler webCrawler;
    private final TextAnalyzer textAnalyzer;
    private final SpellChecker spellChecker;
    private final WordCompletion wordCompletion;
    private final FrequencyCounter frequencyCounter;
    
    // In-memory map to store crawl results by ID
    private final Map<String, CrawlResponse> crawlResults = new ConcurrentHashMap<>();
    
    // Valid API keys (in a real app, these would be stored in a database)
    private final Set<String> validApiKeys = new HashSet<>(Arrays.asList(
        "test-api-key-123",
        "demo-api-key-456"
    ));

    public CrawlerService(WebCrawler webCrawler,
                         TextAnalyzer textAnalyzer,
                         SpellChecker spellChecker,
                         WordCompletion wordCompletion,
                         FrequencyCounter frequencyCounter) {
        this.webCrawler = webCrawler;
        this.textAnalyzer = textAnalyzer;
        this.spellChecker = spellChecker;
        this.wordCompletion = wordCompletion;
        this.frequencyCounter = frequencyCounter;
    }
    
    public boolean validateApiKey(String apiKey) {
        return validApiKeys.contains(apiKey);
    }
    
    public CrawlResponse crawlWebsite(String url) {
        // Generate a unique ID for this crawl
        String crawlId = UUID.randomUUID().toString();
        
        // Create initial response
        CrawlStatusResponse response = new CrawlStatusResponse();
        response.setSuccess(true);
        response.setStatus("in_progress");
        response.setId(crawlId);
        response.setCompleted(0);
        response.setTotal(0);
        response.setStartedAt(new Date());
        response.setExpiresAt(new Date(System.currentTimeMillis() + 86400000)); // 24 hours
        
        // Store initial response
        crawlResults.put(crawlId, response);
        
        // Start crawling in a separate thread
        CompletableFuture.runAsync(() -> {
            try {
                // Perform the actual crawling
                List<PageData> crawledPages = webCrawler.crawl(url);
                
                // Process the crawled pages
                List<ProcessedPageData> processedPages = new ArrayList<>();
                
                for (PageData page : crawledPages) {
                    String content = page.getContent();
                    
                    // Apply various analysis algorithms
                    TextAnalysis textAnalysis = textAnalyzer.analyze(content);
                    List<SpellCorrection> spellingCorrections = spellChecker.checkSpelling(content);
                    List<String> wordSuggestions = wordCompletion.getSuggestions("ph");
                    Map<String, Integer> wordFrequencies = frequencyCounter.countWordFrequencies(content);
                    
                    // Create processed page data
                    ProcessedPageData processedPage = new ProcessedPageData();
                    processedPage.setUrl(page.getUrl());
                    processedPage.setTitle(page.getTitle());
                    processedPage.setContent(content);
                    processedPage.setAnalysis(textAnalysis);
                    processedPage.setSpellingCorrections(spellingCorrections);
                    processedPage.setSearchSuggestions(wordSuggestions);
                    processedPage.setWordFrequencies(wordFrequencies);
                    
                    processedPages.add(processedPage);
                }
                
                // Update the response
                CrawlStatusResponse updatedResponse = new CrawlStatusResponse();
                updatedResponse.setSuccess(true);
                updatedResponse.setStatus("completed");
                updatedResponse.setId(crawlId);
                updatedResponse.setCompleted(crawledPages.size());
                updatedResponse.setTotal(crawledPages.size());
                updatedResponse.setStartedAt(response.getStartedAt());
                updatedResponse.setCompletedAt(new Date());
                updatedResponse.setExpiresAt(response.getExpiresAt());
                updatedResponse.setData(processedPages);
                updatedResponse.setCreditsUsed(processedPages.size());
                
                // Store updated response
                crawlResults.put(crawlId, updatedResponse);
                
            } catch (Exception e) {
                // Handle errors
                ErrorResponse errorResponse = new ErrorResponse("Error crawling website: " + e.getMessage());
                crawlResults.put(crawlId, errorResponse);
            }
        });
        
        return response;
    }
    
    public CrawlResponse getCrawlStatus(String id) {
        CrawlResponse response = crawlResults.get(id);
        if (response == null) {
            return new ErrorResponse("Crawl ID not found: " + id);
        }
        return response;
    }
}`}
              </pre>
            </TabsContent>

            <TabsContent value="model" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Data Models</h3>
                <span className="text-xs text-muted-foreground">Required model classes</span>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
{`// CrawlRequest.java
@Data
public class CrawlRequest {
    private String url;
}

// CrawlResponse.java - Base interface
public interface CrawlResponse {
    boolean isSuccess();
}

// CrawlStatusResponse.java
@Data
public class CrawlStatusResponse implements CrawlResponse {
    private boolean success = true;
    private String id;
    private String status;
    private int completed;
    private int total;
    private int creditsUsed;
    private Date startedAt;
    private Date completedAt;
    private Date expiresAt;
    private List<ProcessedPageData> data;
}

// ErrorResponse.java
@Data
public class ErrorResponse implements CrawlResponse {
    private boolean success = false;
    private String error;
    
    public ErrorResponse(String error) {
        this.error = error;
    }
}

// ProcessedPageData.java
@Data
public class ProcessedPageData {
    private String url;
    private String title;
    private String content;
    private TextAnalysis analysis;
    private List<SpellCorrection> spellingCorrections;
    private List<String> searchSuggestions;
    private Map<String, Integer> wordFrequencies;
}

// TextAnalysis.java
@Data
public class TextAnalysis {
    private List<String> phoneNumbers;
    private List<String> emailAddresses;
    private List<String> urls;
}

// SpellCorrection.java
@Data
public class SpellCorrection {
    private String original;
    private String suggested;
}

// And additional models as needed`}
              </pre>
            </TabsContent>
          </Tabs>

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
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.jsoup</groupId>
        <artifactId>jsoup</artifactId>
        <version>1.15.3</version>
    </dependency>
</dependencies>`}
          </pre>

          <div className="flex flex-col gap-4 mt-8">
            <div className="bg-muted/30 p-4 rounded border border-muted">
              <h3 className="font-medium text-md flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Test Keys for Development
              </h3>
              <p className="text-sm mt-2">
                Use these API keys for testing the backend integration:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-background p-3 rounded border">
                  <div className="text-xs font-mono">test-api-key-123</div>
                  <div className="text-xs text-muted-foreground mt-1">Primary test key</div>
                </div>
                <div className="bg-background p-3 rounded border">
                  <div className="text-xs font-mono">demo-api-key-456</div>
                  <div className="text-xs text-muted-foreground mt-1">Secondary demo key</div>
                </div>
              </div>
            </div>
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
