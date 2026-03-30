import * as fs from 'fs';
import * as path from 'path';

const workflowsPath = path.join(__dirname, '..', 'workflows.json');
const data = JSON.parse(fs.readFileSync(workflowsPath, 'utf-8'));

interface Workflow {
  idea: string;
  complexity: string;
  use_case: string;
  platforms: string[];
  votes: number;
  category_id: string;
}

// Best SMB-focused workflow ideas to put at top
const topSMBIdeas = [
  // Sales & CRM
  "When new lead fills Typeform, then add to Mailchimp list, create Salesforce contact, and notify sales team",
  "When customer abandons cart, then send reminder email with 10% discount code",
  "When payment received on Stripe, then generate PDF receipt and email to customer",
  "When Shopify order is placed, then create QuickBooks invoice and update inventory",
  "When customer review posted on Google My Business, then sentiment analysis and respond with template",
  "When high-value lead created, then assign to sales and require qualification call",
  "When demo call ends, then send personalized follow-up email with recording link and next steps",
  "When contract signed in DocuSign, then save to legal folder and notify finance team",
  "When pricing page is visited by known lead, then send personalized pricing breakdown email",
  "When customer views product 3+ times, then send personalized discount offer",
  
  // Finance & Accounting
  "When new email arrives with 'invoice' in subject, then extract amount and due date, create calendar reminder, and save to expenses folder",
  "When expense exceeds $1000, then pause and require manager approval before processing",
  "When customer requests refund over $500, then supervisor approval required",
  "When invoice amount exceeds threshold, then require dual approval",
  "When purchase order over $25000, then require CFO approval and signature",
  "When budget variance exceeds 15%, then alert finance and require explanation",
  "When recurring payment fails, then retry payment, notify customer, and escalate if unresolved",
  "When monthly close completed, then generate reports, distribute to stakeholders, and archive",
  
  // Customer Service
  "When Twitter mention contains 'support', then create Zendesk ticket and reply with ticket number",
  "When Zendesk ticket marked solved, then request CSAT survey via email",
  "When customer escalates complaint, then supervisor intervention and approval",
  "When support ticket unresolved for 24 hours, then escalate to senior agent and notify manager",
  "When negative review posted, then alert customer success and create recovery task",
  "When customer birthday approaches, then send personalized offer and add to celebration campaign",
  
  // HR & Operations
  "When new employee added to HR system, then create accounts in Slack, Google Workspace, and Notion",
  "When employee promotion recommended, then HR review and director approval",
  "When HR termination initiated, then legal review and director approval required",
  "When PTO request submitted, then check coverage and route to manager for approval",
  "When new hire starts, then send welcome kit, schedule orientation, and assign buddy",
  "When employee anniversary approaching, then prepare recognition and notify manager",
  "When candidate is rejected, then send personalized feedback email and add to talent pipeline",
  "When benefits enrollment period opens, then send personalized options summary and deadline reminders",
  
  // Marketing & Content
  "When new podcast episode published, then transcribe, create blog post, and share on social media",
  "When Instagram post receives 100 likes, then save to Airtable and analyze engagement",
  "When LinkedIn post gets 50 comments, then export data and create engagement report",
  "When RSS feed updates with new article, then summarize with AI and post to company blog",
  "When content scheduled for publication, then editor review and approval required",
  "When marketing spend exceeds $10000, then freeze and require VP approval",
  "When newsletter compiled, then personalize content and optimize send time",
  "When blog post published, then share to social channels and notify subscribers",
  
  // Operations & Productivity
  "When meeting ends, then generate transcript, extract action items, and email participants",
  "When calendar event starts, then mute phone and set Slack status to 'in meeting'",
  "When calendar shows vacation, then set email auto-reply and assign tasks to backup",
  "When Airtable record updated, then sync changes to Google Sheets and Notion",
  "When competitor website changes pricing page, then capture screenshot and alert sales team",
  "When new file added to Dropbox folder, then compress and upload to AWS S3",
  "When Jira ticket assigned to me, then add to Todoist and block time on calendar",
  "When document uploaded to SharePoint, then OCR extract text and index in Elasticsearch",
  "When project deadline is 3 days away, then send reminder to team and check task status",
  "When weekly report due, then compile data from all sources and generate summary",
  
  // DevOps & Technical
  "When GitHub issue is labeled 'urgent', then post to Slack #urgent channel and notify team lead",
  "When server CPU exceeds 90%, then restart service and notify DevOps team",
  "When GitLab merge request created, then run tests and post results as comment",
  "When Slack message contains 'deploy', then trigger CI/CD pipeline and post status",
  "When pull request is merged, then update changelog, trigger deployment, and notify QA",
  "When service health check fails, then restart container and verify recovery",
  "When API call fails with timeout, then retry with exponential backoff and alert if persistent",
  "When database connection drops, then reconnect and replay queued transactions",
  "When payment processing fails, then retry with backup gateway and notify",
  "When backup job fails, then retry with alternate storage and escalate on third failure",
  
  // Legal & Compliance
  "When contract value over $50000, then route to legal review and await sign-off",
  "When new vendor onboarded, then compliance check and finance approval required",
  "When partnership agreement drafted, then legal and executive approval required",
  "When access to sensitive data requested, then security review and manager approval",
  "When NDA received, then extract key terms, route to legal, and set expiration reminder",
  "When compliance audit scheduled, then gather documents and notify department heads",
  
  // E-commerce specific
  "When inventory drops below threshold, then create purchase order and notify supplier",
  "When product price changes, then update all channels and notify subscribed customers",
  "When order ships, then send tracking notification and update customer portal",
  "When return request submitted, then generate label, update inventory, and process refund",
  "When flash sale starts, then update pricing, notify subscribers, and boost social ads",
  
  // Real Estate / Professional Services
  "When property listing created, then syndicate to portals and schedule photos",
  "When showing scheduled, then confirm with client and send directions",
  "When offer received, then notify seller, prepare comparison, and schedule review",
  "When closing date approaches, then send checklist to all parties and schedule walkthrough",
  
  // Healthcare / Appointments
  "When appointment scheduled, then send confirmation and add to provider calendar",
  "When appointment reminder due, then send SMS and email with prep instructions",
  "When patient no-shows, then reschedule, update records, and apply policy",
  "When prescription renewal due, then notify patient and prepare for provider review",
];

// Ideas to remove (personal/consumer, not SMB)
const ideasToRemove = [
  "When weather forecast shows rain tomorrow, then send SMS reminder to bring umbrella",
];

// Fix use_case mapping
const useCaseFixes: Record<string, string> = {
  // Shopify/e-commerce ideas should NOT be "development"
  "When Shopify order is placed, then create QuickBooks invoice and update inventory": "e-commerce",
  "When Twitter mention contains 'support', then create Zendesk ticket and reply with ticket number": "customer_service",
  "When RSS feed updates with new article, then summarize with AI and post to company blog": "marketing",
  "When calendar event starts, then mute phone and set Slack status to 'in meeting'": "productivity",
  "When LinkedIn post gets 50 comments, then export data and create engagement report": "marketing",
  "When Instagram post receives 100 likes, then save to Airtable and analyze engagement": "marketing",
  "When new podcast episode published, then transcribe, create blog post, and share on social media": "marketing",
  "When Zendesk ticket marked solved, then request CSAT survey via email": "customer_service",
  "When Jira ticket assigned to me, then add to Todoist and block time on calendar": "productivity",
  "When Airtable record updated, then sync changes to Google Sheets and Notion": "operations",
  "When new employee added to HR system, then create accounts in Slack, Google Workspace, and Notion": "hr",
  "When server CPU exceeds 90%, then restart service and notify DevOps team": "devops",
  "When flight delayed, then rebook hotel and notify travel coordinator": "operations",
  "When Slack message contains 'deploy', then trigger CI/CD pipeline and post status": "devops",
};

// Filter out bad ideas
let workflows: Workflow[] = data.workflows.filter(
  (w: Workflow) => !ideasToRemove.includes(w.idea)
);

// Fix use_cases
workflows = workflows.map((w: Workflow) => {
  if (useCaseFixes[w.idea]) {
    return { ...w, use_case: useCaseFixes[w.idea] };
  }
  return w;
});

// Create a set for quick lookup
const topIdeasSet = new Set(topSMBIdeas);

// Separate top ideas from the rest
const topWorkflows: Workflow[] = [];
const remainingWorkflows: Workflow[] = [];

for (const w of workflows) {
  if (topIdeasSet.has(w.idea)) {
    topWorkflows.push(w);
  } else {
    remainingWorkflows.push(w);
  }
}

// Sort top workflows in the order defined in topSMBIdeas
topWorkflows.sort((a, b) => {
  return topSMBIdeas.indexOf(a.idea) - topSMBIdeas.indexOf(b.idea);
});

// Combine: top ideas first, then remaining
const reorderedWorkflows = [...topWorkflows, ...remainingWorkflows];

console.log(`Total workflows: ${reorderedWorkflows.length}`);
console.log(`Top SMB ideas found: ${topWorkflows.length}/${topSMBIdeas.length}`);
console.log(`Ideas removed: ${data.workflows.length - workflows.length}`);

// Write back
const output = { workflows: reorderedWorkflows };
fs.writeFileSync(workflowsPath, JSON.stringify(output, null, 2));
console.log('✅ Reorganized workflows.json - best SMB ideas now at top!');
