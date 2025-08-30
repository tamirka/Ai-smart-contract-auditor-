
import { GoogleGenAI, Type } from "@google/genai";
import { AuditReport } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A high-level summary of the audit findings, written in a professional tone."
    },
    verdict: {
      type: Type.STRING,
      description: "A final verdict on the contract's readiness for deployment. Examples: 'Not Ready for Mainnet', 'Needs Fixes', 'Safe for Deployment with Caution'."
    },
    findings: {
      type: Type.ARRAY,
      description: "A list of all issues, vulnerabilities, and suggestions found in the contract.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: {
            type: Type.STRING,
            description: "A unique identifier for the finding, e.g., 'ST-CR-01'."
          },
          severity: {
            type: Type.STRING,
            description: "The severity of the issue. Must be one of: Critical, High, Medium, Low, Informational, Gas Optimization."
          },
          category: {
            type: Type.STRING,
            description: "The category of the finding. Examples: Security, Gas Optimization, Best Practices, Logic Error."
          },
          description: {
            type: Type.STRING,
            description: "A detailed, technical explanation of the vulnerability or issue."
          },
          recommendation: {
            type: Type.STRING,
            description: "Clear, actionable advice on how to fix the issue."
          },
          codeFix: {
            type: Type.STRING,
            description: "A code snippet suggesting the fix. This should be concise and only show the corrected code. Format as a string, not a code block."
          }
        },
        required: ["id", "severity", "category", "description", "recommendation"]
      }
    }
  },
  required: ["summary", "verdict", "findings"]
};


export const auditContract = async (contractCode: string): Promise<AuditReport> => {
  const prompt = `
    Analyze the following Solidity smart contract for security vulnerabilities, gas inefficiencies, and adherence to best practices.
    Provide a comprehensive audit report in JSON format.
    
    Contract Code:
    \`\`\`solidity
    ${contractCode}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as AuditReport;
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('429')) {
       throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to get a valid audit report from the AI. The model may have returned an invalid format.");
  }
};
