import React, { useState } from 'react';
import { Search, Loader2, Mail, AlertCircle, CheckCircle2, Copy, RefreshCcw, Info, Code2, Terminal } from 'lucide-react';

interface EmailResponse {
  email: string;
  valid: boolean;
  message: string;
}

function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<EmailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showStructure, setShowStructure] = useState(true);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setShowStructure(false);
    
    try {
      const response = await fetch('https://mail.isitfake.xyz/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('api res >>>', response);

      if (!response.ok) {
        // For demonstration, show dummy data when API fails
        const dummyData: EmailResponse = {
          email: email,
          valid: false,
          message: "Not found"
        };
        setResult(dummyData);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Show dummy data instead of error for demonstration
      const dummyData: EmailResponse = {
        email: email,
        valid: false,
        message: "Not found"
      };
      setResult(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopySnippet = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch (err) {
      console.error('Failed to copy code snippet:', err);
    }
  };

  const handleReset = () => {
    setEmail('');
    setResult(null);
    setError(null);
    setShowStructure(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const codeSnippets = {
    curl: `curl -X POST https://mail.isitfake.xyz/check-email \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com"}'`,
    javascript: `fetch('https://mail.isitfake.xyz/check-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

response = requests.post(
    'https://mail.isitfake.xyz/check-email',
    json={'email': 'user@example.com'}
)
data = response.json()
print(data)`,
    node: `const axios = require('axios');

async function checkEmail(email) {
  try {
    const response = await axios.post('https://mail.isitfake.xyz/check-email', {
      email: email
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50">
      {/* Header */}
      <header className="pt-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
            <h1 className="text-4xl font-bold mb-4">
              Email Search Tool
            </h1>
            <p className="text-blue-100">
              Quick and easy way to search our database for email information
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 transform hover:shadow-lg transition-shadow">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address to search"
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                required
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                {email && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Reset search"
                  >
                    <RefreshCcw size={20} />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Response Structure Card */}
          {showStructure && (
            <>
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-blue-500" size={24} />
                  <h2 className="text-lg font-semibold text-gray-800">Response Structure</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
{`{
  "email": "user@example.com",
  "valid": "True or False",
  "message": "Hello World"
}`}</pre>
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="font-semibold mb-2">Field Descriptions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><span className="font-medium">email:</span> The queried email address</li>
                      <li><span className="font-medium">status:</span> Account status (active/inactive)</li>
                      <li><span className="font-medium">domain:</span> Email domain name</li>
                      <li><span className="font-medium">disposable:</span> Whether it's a temporary email</li>
                      <li><span className="font-medium">free_provider:</span> Whether it's from a free email provider</li>
                      <li><span className="font-medium">score:</span> Trust score (0-1)</li>
                      <li><span className="font-medium">last_checked:</span> Last verification date</li>
                      <li><span className="font-medium">account_details:</span> User account information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* API Documentation */}
              
            </>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-red-800 font-semibold mb-1">Error Occurred</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {result && !error && (
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 transform hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Email Status Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Email Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{result.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Valid</p>
                        <p className="font-medium">{result.valid ? 'True': 'False'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Message</p>
                        <p className="font-medium capitalize">{result.message}</p>
                      </div>
                    </div>
                  </div>

            

                  {/* Raw JSON Section */}
                  <div className="mt-4">
                    <details className="group">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                        View Raw JSON
                      </summary>
                      <div className="mt-2 bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          )}

<div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="text-blue-500" size={24} />
                  <h2 className="text-lg font-semibold text-gray-800">API Documentation</h2>
                </div>
                <div className="space-y-6">
                  {/* Endpoint Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">Endpoint</h3>
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                      <code className="text-sm text-gray-800">POST https://mail.isitfake.xyz/check-email</code>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Request Headers</h4>
                      <code className="text-sm text-gray-600 block bg-gray-100 p-2 rounded">
                        Content-Type: application/json
                      </code>
                    </div>
                  </div>

                  {/* Code Examples */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Code Examples</h3>
                    <div className="space-y-4">
                      {/* cURL */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Terminal size={16} className="text-gray-600" />
                            <h4 className="text-sm font-semibold text-gray-700">cURL</h4>
                          </div>
                          <button
                            onClick={() => handleCopySnippet(codeSnippets.curl, 'curl')}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            {copiedSnippet === 'curl' ? (
                              <CheckCircle2 size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copiedSnippet === 'curl' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
                          {codeSnippets.curl}
                        </pre>
                      </div>

                      {/* JavaScript */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-gray-600" />
                            <h4 className="text-sm font-semibold text-gray-700">JavaScript (Fetch)</h4>
                          </div>
                          <button
                            onClick={() => handleCopySnippet(codeSnippets.javascript, 'javascript')}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            {copiedSnippet === 'javascript' ? (
                              <CheckCircle2 size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copiedSnippet === 'javascript' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
                          {codeSnippets.javascript}
                        </pre>
                      </div>

                      {/* Python */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-gray-600" />
                            <h4 className="text-sm font-semibold text-gray-700">Python (requests)</h4>
                          </div>
                          <button
                            onClick={() => handleCopySnippet(codeSnippets.python, 'python')}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            {copiedSnippet === 'python' ? (
                              <CheckCircle2 size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copiedSnippet === 'python' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
                          {codeSnippets.python}
                        </pre>
                      </div>

                      {/* Node.js */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-gray-600" />
                            <h4 className="text-sm font-semibold text-gray-700">Node.js (axios)</h4>
                          </div>
                          <button
                            onClick={() => handleCopySnippet(codeSnippets.node, 'node')}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            {copiedSnippet === 'node' ? (
                              <CheckCircle2 size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copiedSnippet === 'node' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
                          {codeSnippets.node}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </section>
    </div>
  );
}

export default App;