import * as fs from 'fs';

const platforms = ["n8n", "Hermes", "OpenClaw"];

function getRandomPlatforms(): string[] {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...platforms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Extract unique core ideas from JSON
function extractUniqueIdeas(jsonPath: string): Map<string, any> {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const uniqueIdeas = new Map<string, any>();
  
  for (const category of data.categories) {
    for (const idea of category.ideas) {
      // Extract core idea (before "resulting in")
      const coreIdea = idea.idea.split(', resulting in')[0].trim();
      
      if (!uniqueIdeas.has(coreIdea)) {
        uniqueIdeas.set(coreIdea, {
          idea: coreIdea,
          complexity: idea.complexity,
          use_case: idea.use_case,
          platforms: idea.platforms,
          categoryName: category.name
        });
      }
    }
  }
  
  return uniqueIdeas;
}

// Map idea text to category ID
function getCategoryId(ideaText: string): string {
  const lowerIdea = ideaText.toLowerCase();
  
  // Human-Gate: Requires human approval/intervention
  if (lowerIdea.includes('approval') || lowerIdea.includes('review') || 
      lowerIdea.includes('manager') || lowerIdea.includes('confirm')) {
    return 'human-gate';
  }
  
  // Self-Heal: Auto-recovery patterns
  if (lowerIdea.includes('retry') || lowerIdea.includes('restart') || 
      lowerIdea.includes('recover') || lowerIdea.includes('heal') ||
      lowerIdea.includes('fail') || lowerIdea.includes('rollback')) {
    return 'self-heal';
  }
  
  // Smart-Context: AI/ML powered decisions
  if (lowerIdea.includes('ai') || lowerIdea.includes('summarize') || 
      lowerIdea.includes('analyze') || lowerIdea.includes('sentiment') ||
      lowerIdea.includes('classify') || lowerIdea.includes('predict')) {
    return 'smart-context';
  }
  
  // Bridge: Cross-platform sync
  if (lowerIdea.includes('sync') || lowerIdea.includes('mirror') ||
      lowerIdea.includes('replicate') || lowerIdea.includes('integrate')) {
    return 'bridge';
  }
  
  // Clockwork: Scheduled/time-based
  if (lowerIdea.includes('every') || lowerIdea.includes('daily') ||
      lowerIdea.includes('weekly') || lowerIdea.includes('schedule') ||
      lowerIdea.includes('morning') || lowerIdea.includes('monthly')) {
    return 'clockwork';
  }
  
  // Instant-React: Real-time responses
  if (lowerIdea.includes('immediately') || lowerIdea.includes('instant') ||
      lowerIdea.includes('real-time') || lowerIdea.includes('alert') ||
      lowerIdea.includes('page') || lowerIdea.includes('notify')) {
    return 'instant-react';
  }
  
  // Shape-Shift: Data transformation
  if (lowerIdea.includes('convert') || lowerIdea.includes('transform') ||
      lowerIdea.includes('format') || lowerIdea.includes('extract') ||
      lowerIdea.includes('parse') || lowerIdea.includes('ocr')) {
    return 'shape-shift';
  }
  
  // Content-Machine: Content generation
  if (lowerIdea.includes('generate') || lowerIdea.includes('create') ||
      lowerIdea.includes('publish') || lowerIdea.includes('content') || 
      lowerIdea.includes('blog') || lowerIdea.includes('post')) {
    return 'content-machine';
  }
  
  // Watchdog: Monitoring/alerting
  if (lowerIdea.includes('monitor') || lowerIdea.includes('watch') ||
      lowerIdea.includes('exceeds') || lowerIdea.includes('drops') ||
      lowerIdea.includes('threshold') || lowerIdea.includes('cpu')) {
    return 'watchdog';
  }
  
  // Swarm: Parallel/batch processing
  if (lowerIdea.includes('batch') || lowerIdea.includes('bulk') ||
      lowerIdea.includes('multiple')) {
    return 'swarm';
  }
  
  // Domino: Chain reactions / multi-step (check commas)
  if (lowerIdea.includes('and then') || lowerIdea.includes('followed by') ||
      (lowerIdea.match(/,/g) || []).length >= 2) {
    return 'domino';
  }
  
  // Default to when-then
  return 'when-then';
}

// 500 NEW unique SMB-focused workflow ideas
const newIdeas: Array<{idea: string, complexity: string, use_case: string}> = [
  // === SALES & CRM (50 ideas) ===
  { idea: "When deal closes in CRM, then auto-generate invoice, update revenue dashboard, and trigger commission calculation", complexity: "complex", use_case: "sales" },
  { idea: "When prospect opens email 3+ times, then move to hot leads list and alert sales rep via SMS", complexity: "medium", use_case: "sales" },
  { idea: "When demo call ends, then send personalized follow-up email with recording link and next steps", complexity: "medium", use_case: "sales" },
  { idea: "When lead score reaches 80+, then auto-assign to top performer and schedule intro call", complexity: "complex", use_case: "sales" },
  { idea: "When proposal is viewed, then notify account owner and log engagement in CRM", complexity: "simple", use_case: "sales" },
  { idea: "When contract expires in 30 days, then create renewal opportunity and email customer success", complexity: "medium", use_case: "sales" },
  { idea: "When competitor is mentioned in sales call transcript, then tag call and add to competitive intel database", complexity: "complex", use_case: "sales" },
  { idea: "When SQLs hit monthly target, then post celebration to team channel and update leaderboard", complexity: "simple", use_case: "sales" },
  { idea: "When discovery call is booked, then pull company data from Clearbit and add to CRM notes", complexity: "medium", use_case: "sales" },
  { idea: "When deal stalls for 14 days, then trigger nurture sequence and notify manager", complexity: "medium", use_case: "sales" },
  { idea: "When pricing page is visited by known lead, then send personalized pricing breakdown email", complexity: "complex", use_case: "sales" },
  { idea: "When quote is requested, then auto-generate PDF with dynamic pricing and send within 5 minutes", complexity: "complex", use_case: "sales" },
  { idea: "When outbound sequence completes with no response, then add to re-engagement campaign in 90 days", complexity: "medium", use_case: "sales" },
  { idea: "When sales meeting is scheduled, then research prospect company and brief sales rep via Slack", complexity: "complex", use_case: "sales" },
  { idea: "When won deal industry matches target segment, then create case study request and tag marketing", complexity: "medium", use_case: "sales" },
  { idea: "When MQL converts to SQL, then log conversion time and update attribution model", complexity: "complex", use_case: "sales" },
  { idea: "When sales email bounces, then find alternative contact via LinkedIn and update CRM", complexity: "complex", use_case: "sales" },
  { idea: "When trial signup occurs, then assign SDR, send welcome sequence, and schedule check-in", complexity: "medium", use_case: "sales" },
  { idea: "When annual contract value exceeds $50k, then require legal review and manager approval", complexity: "medium", use_case: "sales" },
  { idea: "When customer churns, then log reasons, trigger win-back sequence in 6 months, and notify CS", complexity: "complex", use_case: "sales" },
  { idea: "When pipeline coverage drops below 3x, then escalate to sales leadership and increase prospecting", complexity: "complex", use_case: "sales" },
  { idea: "When champion leaves target account, then research replacement contact and update opportunity", complexity: "medium", use_case: "sales" },
  { idea: "When competitor wins deal, then document loss reasons and add to competitive analysis", complexity: "medium", use_case: "sales" },
  { idea: "When upsell opportunity is identified, then create opportunity record and assign to account manager", complexity: "medium", use_case: "sales" },
  { idea: "When customer usage exceeds plan limits, then trigger upgrade conversation with CSM", complexity: "medium", use_case: "sales" },

  // === MARKETING (50 ideas) ===
  { idea: "When blog post is published, then create social snippets, schedule posts, and add to newsletter queue", complexity: "complex", use_case: "marketing" },
  { idea: "When webinar registration occurs, then add to reminder sequence, create calendar hold, and send prep materials", complexity: "medium", use_case: "marketing" },
  { idea: "When landing page conversion rate drops below 2%, then alert marketing team and create A/B test task", complexity: "medium", use_case: "marketing" },
  { idea: "When email campaign CTR exceeds benchmark, then replicate subject line pattern to template library", complexity: "simple", use_case: "marketing" },
  { idea: "When UTM campaign shows ROI above 300%, then increase budget allocation and notify finance", complexity: "complex", use_case: "marketing" },
  { idea: "When social mention sentiment is negative, then escalate to PR team and draft response", complexity: "complex", use_case: "marketing" },
  { idea: "When competitor launches product, then capture announcement, analyze features, and brief sales team", complexity: "complex", use_case: "marketing" },
  { idea: "When podcast episode mentions our brand, then add to media mentions tracker and thank host", complexity: "medium", use_case: "marketing" },
  { idea: "When newsletter subscriber replies, then log feedback, tag with topic, and route to relevant team", complexity: "medium", use_case: "marketing" },
  { idea: "When event registration hits capacity, then create waitlist, update landing page, and notify sales", complexity: "medium", use_case: "marketing" },
  { idea: "When content downloads exceed 100, then convert to gated asset and add lead capture form", complexity: "medium", use_case: "marketing" },
  { idea: "When brand mention appears on Reddit, then post to social listening dashboard and assess response need", complexity: "complex", use_case: "marketing" },
  { idea: "When marketing qualified leads spike, then analyze source attribution and adjust budget", complexity: "complex", use_case: "marketing" },
  { idea: "When influencer engagement rate exceeds 5%, then add to partnership outreach list", complexity: "medium", use_case: "marketing" },
  { idea: "When product review is posted, then extract quotes for testimonials and add to review tracker", complexity: "medium", use_case: "marketing" },
  { idea: "When ad spend reaches daily limit, then pause low-performers and reallocate to top campaigns", complexity: "complex", use_case: "marketing" },
  { idea: "When press release is approved, then distribute to wire services and update media kit", complexity: "medium", use_case: "marketing" },
  { idea: "When video views hit 10k, then create highlight reel and repurpose for shorts", complexity: "complex", use_case: "marketing" },
  { idea: "When organic keyword ranks in top 3, then create supporting content cluster", complexity: "medium", use_case: "marketing" },
  { idea: "When unsubscribe rate exceeds 1%, then analyze content, survey churned users, and adjust strategy", complexity: "complex", use_case: "marketing" },
  { idea: "When trade show registration opens, then book booth, create collateral list, and assign staff", complexity: "complex", use_case: "marketing" },
  { idea: "When case study is approved, then format for website, create social assets, and send to sales", complexity: "complex", use_case: "marketing" },
  { idea: "When PPC cost per click exceeds threshold, then adjust bids and notify campaign manager", complexity: "medium", use_case: "marketing" },
  { idea: "When marketing calendar has gaps, then suggest content ideas based on trending topics", complexity: "medium", use_case: "marketing" },
  { idea: "When customer testimonial video is uploaded, then transcribe, create clips, and schedule shares", complexity: "complex", use_case: "marketing" },

  // === CUSTOMER SERVICE (50 ideas) ===
  { idea: "When support ticket mentions urgent or down, then escalate to Tier 2 and page on-call engineer", complexity: "complex", use_case: "customer service" },
  { idea: "When customer satisfaction drops below 4 stars, then trigger manager review and schedule follow-up call", complexity: "medium", use_case: "customer service" },
  { idea: "When same issue reported by 5+ customers, then create incident report and notify product team", complexity: "complex", use_case: "customer service" },
  { idea: "When response time exceeds SLA, then auto-assign additional agent and update customer", complexity: "medium", use_case: "customer service" },
  { idea: "When VIP customer submits ticket, then route to dedicated team and add priority tag", complexity: "simple", use_case: "customer service" },
  { idea: "When ticket is resolved, then send survey, update knowledge base if new issue, and close loop", complexity: "complex", use_case: "customer service" },
  { idea: "When customer uses angry sentiment in chat, then alert supervisor and offer callback option", complexity: "complex", use_case: "customer service" },
  { idea: "When FAQ page gets heavy traffic, then analyze queries and create targeted help content", complexity: "medium", use_case: "customer service" },
  { idea: "When onboarding ticket is created, then assign customer success manager and create 30-day check-in", complexity: "medium", use_case: "customer service" },
  { idea: "When refund is requested, then check order history, apply policy rules, and route appropriately", complexity: "complex", use_case: "customer service" },
  { idea: "When support call exceeds 15 minutes, then log for training review and schedule follow-up", complexity: "medium", use_case: "customer service" },
  { idea: "When chatbot cannot resolve issue, then seamlessly transfer to human with full context", complexity: "complex", use_case: "customer service" },
  { idea: "When customer feature request matches roadmap item, then link ticket and notify requester of timeline", complexity: "medium", use_case: "customer service" },
  { idea: "When ticket reopens within 7 days, then flag as recurring issue and assign to original agent", complexity: "medium", use_case: "customer service" },
  { idea: "When support volume spikes 50% above normal, then activate overflow team and extend hours", complexity: "complex", use_case: "customer service" },
  { idea: "When agent resolves issue in under 5 minutes, then add to quick-win metrics and recognize performance", complexity: "simple", use_case: "customer service" },
  { idea: "When customer leaves positive review, then thank them, request referral, and add to testimonials", complexity: "medium", use_case: "customer service" },
  { idea: "When support article is viewed but ticket still created, then flag article for improvement", complexity: "medium", use_case: "customer service" },
  { idea: "When payment fails, then send recovery email with payment link and notify account manager", complexity: "medium", use_case: "customer service" },
  { idea: "When customer downgrade request is received, then offer save call with retention specialist", complexity: "medium", use_case: "customer service" },
  { idea: "When NPS response is detractor, then create follow-up task and assign to customer success", complexity: "medium", use_case: "customer service" },
  { idea: "When warranty claim is submitted, then verify purchase, check coverage, and process or deny", complexity: "complex", use_case: "customer service" },
  { idea: "When live chat wait time exceeds 2 minutes, then offer callback option and estimate wait", complexity: "simple", use_case: "customer service" },
  { idea: "When customer mentions cancellation, then transfer to retention and log churn risk", complexity: "medium", use_case: "customer service" },
  { idea: "When bug report is verified, then link to engineering ticket and update customer on status", complexity: "medium", use_case: "customer service" },

  // === FINANCE & ACCOUNTING (50 ideas) ===
  { idea: "When invoice is overdue 30 days, then send escalation email, add late fee, and notify collections", complexity: "medium", use_case: "finance" },
  { idea: "When expense report is submitted, then validate receipts, check policy compliance, and route for approval", complexity: "complex", use_case: "finance" },
  { idea: "When bank transaction does not match any invoice, then flag for reconciliation and notify accountant", complexity: "medium", use_case: "finance" },
  { idea: "When monthly close begins, then create checklist, assign tasks, and schedule review meetings", complexity: "complex", use_case: "finance" },
  { idea: "When payment is received, then match to invoice, update AR aging, and send thank you email", complexity: "medium", use_case: "finance" },
  { idea: "When budget variance exceeds 10%, then alert department head and request explanation", complexity: "medium", use_case: "finance" },
  { idea: "When vendor contract renews, then pull usage data, analyze value, and recommend action", complexity: "complex", use_case: "finance" },
  { idea: "When payroll is processed, then update accounting, generate reports, and file tax documents", complexity: "complex", use_case: "finance" },
  { idea: "When receipt is uploaded, then OCR extract details, categorize expense, and attach to report", complexity: "medium", use_case: "finance" },
  { idea: "When credit card statement arrives, then match transactions, flag anomalies, and send for review", complexity: "complex", use_case: "finance" },
  { idea: "When cash flow projection shows deficit, then alert CFO and create cost-cutting task list", complexity: "complex", use_case: "finance" },
  { idea: "When tax deadline approaches, then gather required documents and send reminder to stakeholders", complexity: "medium", use_case: "finance" },
  { idea: "When purchase order exceeds approval limit, then route to appropriate approver based on amount", complexity: "medium", use_case: "finance" },
  { idea: "When subscription payment fails, then retry with backup payment method and notify billing team", complexity: "medium", use_case: "finance" },
  { idea: "When audit request is received, then compile requested documents and create secure access link", complexity: "complex", use_case: "finance" },
  { idea: "When revenue recognition criteria are met, then book revenue and update financial dashboards", complexity: "complex", use_case: "finance" },
  { idea: "When wire transfer is initiated, then require dual approval and log for compliance", complexity: "complex", use_case: "finance" },
  { idea: "When employee expense exceeds per diem, then flag for review and request justification", complexity: "medium", use_case: "finance" },
  { idea: "When quarterly earnings are finalized, then generate board report and schedule investor call", complexity: "complex", use_case: "finance" },
  { idea: "When new vendor is added, then run credit check, verify W-9, and set up payment terms", complexity: "complex", use_case: "finance" },
  { idea: "When invoice payment is due in 7 days, then send reminder email to customer", complexity: "simple", use_case: "finance" },
  { idea: "When expense category exceeds monthly limit, then notify budget owner and freeze further spending", complexity: "medium", use_case: "finance" },
  { idea: "When duplicate invoice is detected, then flag for review and prevent payment", complexity: "medium", use_case: "finance" },
  { idea: "When currency exchange rate changes significantly, then recalculate foreign invoices and notify finance", complexity: "complex", use_case: "finance" },
  { idea: "When accounts payable ages over 60 days, then prioritize for payment and notify vendor", complexity: "medium", use_case: "finance" },

  // === HR & RECRUITING (50 ideas) ===
  { idea: "When job application is received, then screen resume with AI, score fit, and route to recruiter", complexity: "complex", use_case: "hr" },
  { idea: "When interview is scheduled, then send prep materials to candidate and briefing to interviewer", complexity: "medium", use_case: "hr" },
  { idea: "When offer letter is signed, then initiate background check, create onboarding tasks, and notify IT", complexity: "complex", use_case: "hr" },
  { idea: "When employee anniversary approaches, then prompt manager for recognition and schedule review", complexity: "simple", use_case: "hr" },
  { idea: "When PTO request is submitted, then check coverage, route for approval, and update calendar", complexity: "medium", use_case: "hr" },
  { idea: "When new hire starts, then provision accounts, assign buddy, and schedule orientation sessions", complexity: "complex", use_case: "hr" },
  { idea: "When performance review cycle begins, then create review docs, assign reviewers, and set deadlines", complexity: "complex", use_case: "hr" },
  { idea: "When employee resigns, then initiate offboarding, schedule exit interview, and plan knowledge transfer", complexity: "complex", use_case: "hr" },
  { idea: "When candidate is rejected, then send personalized feedback email and add to talent pipeline", complexity: "medium", use_case: "hr" },
  { idea: "When training completion is logged, then update skills matrix and notify manager", complexity: "simple", use_case: "hr" },
  { idea: "When job posting views plateau, then suggest title optimization and boost on additional channels", complexity: "medium", use_case: "hr" },
  { idea: "When employee feedback mentions burnout, then alert HR and suggest wellness resources", complexity: "complex", use_case: "hr" },
  { idea: "When payroll discrepancy is reported, then create ticket, pull records, and escalate to payroll team", complexity: "medium", use_case: "hr" },
  { idea: "When benefits enrollment period opens, then send personalized options summary and deadline reminders", complexity: "medium", use_case: "hr" },
  { idea: "When referral candidate is hired, then process referral bonus and notify referring employee", complexity: "medium", use_case: "hr" },
  { idea: "When certifications expire, then send renewal reminders and flag compliance risks", complexity: "medium", use_case: "hr" },
  { idea: "When team headcount drops below target, then escalate hiring priority and expand sourcing", complexity: "complex", use_case: "hr" },
  { idea: "When employee requests accommodation, then initiate interactive process and document timeline", complexity: "complex", use_case: "hr" },
  { idea: "When 360 feedback is due, then distribute surveys, send reminders, and compile results", complexity: "complex", use_case: "hr" },
  { idea: "When contractor engagement exceeds 12 months, then flag for compliance review and conversion consideration", complexity: "medium", use_case: "hr" },
  { idea: "When employee completes probation, then schedule review meeting and update status", complexity: "simple", use_case: "hr" },
  { idea: "When time-off balance exceeds carryover limit, then remind employee to use or lose days", complexity: "simple", use_case: "hr" },
  { idea: "When workplace injury is reported, then document incident, notify safety officer, and file OSHA report if required", complexity: "complex", use_case: "hr" },
  { idea: "When employee moves to new state, then update tax withholding and notify payroll", complexity: "medium", use_case: "hr" },
  { idea: "When internship ends, then gather feedback, process final pay, and add to alumni network", complexity: "medium", use_case: "hr" },

  // === DEVELOPMENT & DEVOPS (50 ideas) ===
  { idea: "When pull request is merged, then update changelog, trigger deployment, and notify QA", complexity: "complex", use_case: "development" },
  { idea: "When build fails, then analyze error logs, suggest fixes, and notify committer", complexity: "complex", use_case: "devops" },
  { idea: "When security vulnerability is detected, then create critical ticket, notify security team, and block deployment", complexity: "complex", use_case: "devops" },
  { idea: "When API response time exceeds 500ms, then alert on-call engineer and create performance ticket", complexity: "medium", use_case: "devops" },
  { idea: "When deployment completes, then run smoke tests, update status page, and notify stakeholders", complexity: "complex", use_case: "devops" },
  { idea: "When error rate spikes 10%, then trigger rollback evaluation and page incident commander", complexity: "complex", use_case: "devops" },
  { idea: "When new dependency is added, then scan for vulnerabilities and check license compatibility", complexity: "medium", use_case: "development" },
  { idea: "When sprint ends, then generate velocity report, archive completed stories, and plan retrospective", complexity: "medium", use_case: "development" },
  { idea: "When database query exceeds 5 seconds, then log slow query, analyze execution plan, and create optimization ticket", complexity: "complex", use_case: "devops" },
  { idea: "When SSL certificate expires in 30 days, then auto-renew, update servers, and verify installation", complexity: "complex", use_case: "devops" },
  { idea: "When feature flag is enabled, then log activation, monitor metrics, and schedule cleanup reminder", complexity: "medium", use_case: "development" },
  { idea: "When test coverage drops below 80%, then block merge and notify tech lead", complexity: "medium", use_case: "development" },
  { idea: "When infrastructure costs exceed forecast, then analyze usage, identify optimization opportunities, and alert finance", complexity: "complex", use_case: "devops" },
  { idea: "When staging environment breaks, then restore from backup, notify team, and create incident report", complexity: "complex", use_case: "devops" },
  { idea: "When code review is pending 48 hours, then send reminder to reviewer and escalate if needed", complexity: "simple", use_case: "development" },
  { idea: "When container image is built, then scan for vulnerabilities, sign artifact, and push to registry", complexity: "complex", use_case: "devops" },
  { idea: "When incident is declared, then create war room, page responders, and start status page updates", complexity: "complex", use_case: "devops" },
  { idea: "When feature is released, then update documentation, notify customer success, and create release notes", complexity: "medium", use_case: "development" },
  { idea: "When memory usage exceeds 85%, then trigger garbage collection, scale up if needed, and alert", complexity: "complex", use_case: "devops" },
  { idea: "When GitHub issue is stale for 30 days, then add stale label, comment reminder, and close if no response", complexity: "simple", use_case: "development" },
  { idea: "When hotfix is needed, then create branch, bypass standard review, and schedule post-mortem", complexity: "complex", use_case: "development" },
  { idea: "When database migration runs, then backup first, execute migration, and verify data integrity", complexity: "complex", use_case: "devops" },
  { idea: "When API rate limit is approached, then throttle requests and notify integration owner", complexity: "medium", use_case: "devops" },
  { idea: "When log volume spikes abnormally, then analyze patterns and alert security if suspicious", complexity: "complex", use_case: "devops" },
  { idea: "When DNS propagation completes, then verify resolution and update deployment status", complexity: "medium", use_case: "devops" },

  // === OPERATIONS & PRODUCTIVITY (50 ideas) ===
  { idea: "When meeting has no agenda 24 hours before, then prompt organizer and suggest cancellation", complexity: "simple", use_case: "productivity" },
  { idea: "When document is shared, then log access, set expiration reminder, and notify compliance", complexity: "medium", use_case: "operations" },
  { idea: "When task deadline passes, then notify assignee, escalate to manager, and update project status", complexity: "medium", use_case: "productivity" },
  { idea: "When all subtasks complete, then mark parent task done and trigger next workflow phase", complexity: "medium", use_case: "productivity" },
  { idea: "When meeting recording is available, then transcribe, extract action items, and distribute summary", complexity: "complex", use_case: "productivity" },
  { idea: "When project milestone is reached, then update stakeholders, generate progress report, and celebrate team", complexity: "medium", use_case: "operations" },
  { idea: "When resource utilization exceeds 90%, then alert capacity planning and suggest reallocation", complexity: "complex", use_case: "operations" },
  { idea: "When vendor SLA is breached, then document incident, notify vendor manager, and update risk register", complexity: "complex", use_case: "operations" },
  { idea: "When office supply inventory is low, then generate purchase order and send for approval", complexity: "simple", use_case: "operations" },
  { idea: "When facility maintenance is due, then schedule service, notify affected employees, and log completion", complexity: "medium", use_case: "operations" },
  { idea: "When weekly report is due, then aggregate data from systems, generate draft, and send for review", complexity: "complex", use_case: "productivity" },
  { idea: "When project risk is identified, then add to risk register, assign owner, and schedule mitigation review", complexity: "medium", use_case: "operations" },
  { idea: "When focus time is blocked, then silence notifications, set status, and hold calls", complexity: "simple", use_case: "productivity" },
  { idea: "When document version conflicts, then notify editors, create merge task, and lock for resolution", complexity: "medium", use_case: "productivity" },
  { idea: "When equipment lease expires, then evaluate renewal vs. purchase and prepare recommendation", complexity: "complex", use_case: "operations" },
  { idea: "When standup is completed, then aggregate updates, identify blockers, and distribute summary", complexity: "medium", use_case: "productivity" },
  { idea: "When action item is assigned in meeting, then create task in project tool and set reminder", complexity: "simple", use_case: "productivity" },
  { idea: "When contract milestone is met, then trigger payment request and update project budget", complexity: "medium", use_case: "operations" },
  { idea: "When workspace booking is cancelled, then release room, notify waitlist, and update capacity", complexity: "simple", use_case: "operations" },
  { idea: "When all approvals are received, then merge changes, notify stakeholders, and archive request", complexity: "medium", use_case: "operations" },
  { idea: "When OKR progress is updated, then recalculate completion percentage and notify stakeholders", complexity: "medium", use_case: "productivity" },
  { idea: "When team velocity decreases, then analyze sprint data and schedule improvement discussion", complexity: "complex", use_case: "operations" },
  { idea: "When conference room is double-booked, then notify organizers and suggest alternatives", complexity: "simple", use_case: "operations" },
  { idea: "When project goes over budget by 10%, then freeze non-essential spending and notify sponsor", complexity: "complex", use_case: "operations" },
  { idea: "When knowledge base article is outdated, then flag for review and assign to subject matter expert", complexity: "medium", use_case: "productivity" },

  // === E-COMMERCE & RETAIL (50 ideas) ===
  { idea: "When inventory drops below reorder point, then create purchase order and notify supplier", complexity: "medium", use_case: "operations" },
  { idea: "When order is placed, then verify payment, allocate inventory, and trigger fulfillment", complexity: "complex", use_case: "operations" },
  { idea: "When shipment is delivered, then send delivery confirmation, request review, and update order status", complexity: "medium", use_case: "operations" },
  { idea: "When return is initiated, then generate return label, create RMA, and schedule refund", complexity: "complex", use_case: "customer service" },
  { idea: "When product goes out of stock, then notify subscribers, update listings, and flag for reorder", complexity: "medium", use_case: "operations" },
  { idea: "When customer views product 3+ times, then send personalized discount offer", complexity: "medium", use_case: "marketing" },
  { idea: "When shopping cart value exceeds $200, then offer free shipping and upgrade to priority processing", complexity: "simple", use_case: "sales" },
  { idea: "When product review is 1-star, then create support ticket, reach out to customer, and flag for QA", complexity: "complex", use_case: "customer service" },
  { idea: "When supplier price changes, then update cost calculations, adjust margins, and notify merchandising", complexity: "complex", use_case: "finance" },
  { idea: "When seasonal sale starts, then update pricing, enable banners, and schedule email blast", complexity: "complex", use_case: "marketing" },
  { idea: "When fulfillment delay occurs, then notify customer, offer compensation, and update delivery estimate", complexity: "medium", use_case: "customer service" },
  { idea: "When product bundle is purchased, then log cross-sell success and update recommendation engine", complexity: "medium", use_case: "sales" },
  { idea: "When warehouse capacity reaches 90%, then alert operations and initiate overflow planning", complexity: "complex", use_case: "operations" },
  { idea: "When SKU has not sold in 90 days, then flag for clearance, suggest markdown, and update forecasts", complexity: "complex", use_case: "operations" },
  { idea: "When gift card is purchased, then generate code, send to recipient, and track balance", complexity: "medium", use_case: "sales" },
  { idea: "When fraud indicator is detected, then hold order, verify with customer, and escalate if confirmed", complexity: "complex", use_case: "finance" },
  { idea: "When product page views spike, then verify stock levels, alert marketing, and monitor conversion", complexity: "complex", use_case: "marketing" },
  { idea: "When dropship order is placed, then route to supplier, track shipment, and update customer", complexity: "complex", use_case: "operations" },
  { idea: "When loyalty points reach redemption threshold, then notify customer and suggest rewards", complexity: "simple", use_case: "marketing" },
  { idea: "When checkout abandonment occurs, then send recovery email with cart contents and incentive", complexity: "medium", use_case: "sales" },
  { idea: "When backorder ships, then notify customer, update tracking, and close pending order", complexity: "medium", use_case: "operations" },
  { idea: "When product price drops, then notify wishlist customers and trigger price alert email", complexity: "medium", use_case: "marketing" },
  { idea: "When store receives negative Google review, then respond publicly and create internal ticket", complexity: "medium", use_case: "customer service" },
  { idea: "When flash sale ends, then restore original prices, update inventory counts, and generate report", complexity: "complex", use_case: "operations" },
  { idea: "When customer reaches VIP spending threshold, then upgrade tier and send exclusive perks", complexity: "medium", use_case: "marketing" },

  // === LEGAL & COMPLIANCE (30 ideas) ===
  { idea: "When contract is uploaded, then extract key terms, calculate expiration, and add to tracker", complexity: "complex", use_case: "legal" },
  { idea: "When compliance deadline approaches, then create task list, assign owners, and schedule review", complexity: "medium", use_case: "legal" },
  { idea: "When NDA is requested, then generate from template, route for signature, and track execution", complexity: "medium", use_case: "legal" },
  { idea: "When policy is updated, then notify affected employees, require acknowledgment, and log compliance", complexity: "medium", use_case: "legal" },
  { idea: "When data subject request is received, then initiate response workflow and track deadline", complexity: "complex", use_case: "legal" },
  { idea: "When insurance policy renews, then review coverage, compare quotes, and recommend changes", complexity: "complex", use_case: "legal" },
  { idea: "When litigation hold is issued, then preserve relevant documents and notify custodians", complexity: "complex", use_case: "legal" },
  { idea: "When regulatory change is published, then assess impact, create action items, and brief leadership", complexity: "complex", use_case: "legal" },
  { idea: "When third-party risk assessment is due, then send questionnaire, track responses, and compile report", complexity: "complex", use_case: "legal" },
  { idea: "When data breach is suspected, then initiate incident response, notify security, and document timeline", complexity: "complex", use_case: "legal" },
  { idea: "When contract negotiation stalls, then escalate to legal lead and suggest mediation", complexity: "medium", use_case: "legal" },
  { idea: "When trademark filing is due, then prepare documents, submit application, and track status", complexity: "complex", use_case: "legal" },
  { idea: "When employee signs acknowledgment, then update compliance records and file documentation", complexity: "simple", use_case: "legal" },
  { idea: "When subpoena is received, then notify legal counsel, preserve evidence, and track response deadline", complexity: "complex", use_case: "legal" },
  { idea: "When vendor security incident occurs, then assess impact, document exposure, and update risk profile", complexity: "complex", use_case: "legal" },
  { idea: "When privacy policy changes, then update website, notify users, and log consent if required", complexity: "medium", use_case: "legal" },
  { idea: "When patent application is filed, then track prosecution status and docket key dates", complexity: "complex", use_case: "legal" },
  { idea: "When confidential document is accessed, then log access, verify authorization, and alert if suspicious", complexity: "complex", use_case: "legal" },
  { idea: "When contract auto-renewal window opens, then evaluate terms and recommend action", complexity: "medium", use_case: "legal" },
  { idea: "When GDPR request clock starts, then assign handler, track progress, and ensure timely response", complexity: "complex", use_case: "legal" },

  // === ADDITIONAL SMB IDEAS (75 ideas) ===
  { idea: "When daily sales close, then reconcile registers, generate summary, and deposit to bank", complexity: "complex", use_case: "finance" },
  { idea: "When appointment slot opens from cancellation, then notify waitlist and update booking system", complexity: "medium", use_case: "customer service" },
  { idea: "When employee clocks overtime, then notify manager, check labor budget, and flag for payroll", complexity: "medium", use_case: "hr" },
  { idea: "When service vehicle needs maintenance, then schedule appointment and arrange backup vehicle", complexity: "medium", use_case: "operations" },
  { idea: "When customer birthday approaches, then send personalized offer and add to celebration campaign", complexity: "simple", use_case: "marketing" },
  { idea: "When project phases complete, then invoice milestone, update accounting, and notify client", complexity: "medium", use_case: "finance" },
  { idea: "When business license renewal is due, then gather documents, submit application, and track approval", complexity: "medium", use_case: "legal" },
  { idea: "When customer membership expires, then send renewal offer, process payment, and update status", complexity: "medium", use_case: "sales" },
  { idea: "When service appointment ends, then send satisfaction survey, request review, and schedule follow-up", complexity: "medium", use_case: "customer service" },
  { idea: "When new product is added to catalog, then create descriptions, upload images, and set pricing", complexity: "complex", use_case: "marketing" },
  { idea: "When catering order is placed, then create prep schedule, verify ingredients, and assign staff", complexity: "complex", use_case: "operations" },
  { idea: "When equipment warranty expires, then evaluate service contract and get renewal quotes", complexity: "medium", use_case: "operations" },
  { idea: "When customer requests quote, then calculate pricing, generate proposal, and track for follow-up", complexity: "medium", use_case: "sales" },
  { idea: "When work order is completed, then capture completion photos, get sign-off, and trigger invoicing", complexity: "complex", use_case: "operations" },
  { idea: "When tip is received, then distribute to staff, update payroll records, and generate reports", complexity: "medium", use_case: "finance" },
  { idea: "When reservation is made, then confirm details, send reminders, and prepare for arrival", complexity: "medium", use_case: "customer service" },
  { idea: "When cash drawer is over or short, then document discrepancy, notify manager, and investigate", complexity: "medium", use_case: "finance" },
  { idea: "When delivery route is planned, then optimize sequence, notify drivers, and track completion", complexity: "complex", use_case: "operations" },
  { idea: "When customer loyalty tier increases, then notify them, unlock benefits, and send welcome to tier", complexity: "medium", use_case: "marketing" },
  { idea: "When safety inspection is due, then schedule inspector, prep documentation, and notify staff", complexity: "medium", use_case: "operations" },
  { idea: "When menu item is 86d, then update POS, notify servers, and suggest alternatives", complexity: "simple", use_case: "operations" },
  { idea: "When staff scheduling conflict occurs, then notify manager, suggest swaps, and track resolution", complexity: "medium", use_case: "hr" },
  { idea: "When customer complaint is received, then log issue, assign owner, and track resolution time", complexity: "medium", use_case: "customer service" },
  { idea: "When service contract ends, then assess renewal, propose upsell, and schedule review call", complexity: "complex", use_case: "sales" },
  { idea: "When walk-in customer arrives, then check wait time, add to queue, and send text when ready", complexity: "simple", use_case: "customer service" },
  { idea: "When daily deposits do not match sales, then flag discrepancy and create reconciliation task", complexity: "medium", use_case: "finance" },
  { idea: "When health permit inspection passes, then update certificates, file records, and schedule next", complexity: "medium", use_case: "legal" },
  { idea: "When customer refers new business, then track referral, credit referrer, and send thank you", complexity: "medium", use_case: "sales" },
  { idea: "When seasonal inventory arrives, then receive items, update stock, and create display plan", complexity: "complex", use_case: "operations" },
  { idea: "When gift certificate is redeemed, then update balance, apply to transaction, and log usage", complexity: "simple", use_case: "sales" },
  { idea: "When table turns over, then clear POS, reset table status, and notify host stand", complexity: "simple", use_case: "operations" },
  { idea: "When staff member calls in sick, then find replacement, update schedule, and notify team", complexity: "medium", use_case: "hr" },
  { idea: "When customer signs waiver, then store document, update profile, and confirm completion", complexity: "simple", use_case: "legal" },
  { idea: "When class registration fills up, then create waitlist and notify interested customers", complexity: "simple", use_case: "customer service" },
  { idea: "When instructor cancels class, then notify registered students and offer alternatives", complexity: "medium", use_case: "customer service" },
  { idea: "When package is marked delivered, then notify customer and request delivery confirmation", complexity: "simple", use_case: "operations" },
  { idea: "When customer payment method expires soon, then send update reminder before next charge", complexity: "simple", use_case: "finance" },
  { idea: "When appointment reminder is due, then send SMS and email 24 hours before", complexity: "simple", use_case: "customer service" },
  { idea: "When customer has not visited in 90 days, then send win-back offer and flag for outreach", complexity: "medium", use_case: "marketing" },
  { idea: "When franchise fee is due, then calculate amount, generate invoice, and track payment", complexity: "medium", use_case: "finance" },
  { idea: "When equipment breaks down, then create repair ticket, notify operations, and check warranty", complexity: "medium", use_case: "operations" },
  { idea: "When parking lot reaches capacity, then update signage and notify staff", complexity: "simple", use_case: "operations" },
  { idea: "When weather alert is issued, then notify field staff and reschedule outdoor work", complexity: "medium", use_case: "operations" },
  { idea: "When customer places large order, then verify inventory, confirm pricing, and apply volume discount", complexity: "complex", use_case: "sales" },
  { idea: "When membership is about to auto-renew, then send reminder email with cancel option", complexity: "simple", use_case: "customer service" },
  { idea: "When employee certification expires, then block relevant work assignments and send renewal notice", complexity: "medium", use_case: "hr" },
  { idea: "When product recall is announced, then identify affected inventory, notify customers, and process returns", complexity: "complex", use_case: "operations" },
  { idea: "When commission period closes, then calculate earnings, generate statements, and submit for payroll", complexity: "complex", use_case: "finance" },
  { idea: "When customer dispute is filed, then gather documentation, respond to processor, and track outcome", complexity: "complex", use_case: "finance" },
  { idea: "When lease renewal is due, then assess market rates, prepare negotiation points, and contact landlord", complexity: "complex", use_case: "operations" },
  
  // === ADDITIONAL BATCH 2 (200+ more ideas) ===
  // IoT & Smart Systems
  { idea: "When smart thermostat detects vacancy, then adjust temperature and log energy savings", complexity: "simple", use_case: "operations" },
  { idea: "When motion sensor triggers after hours, then record footage, alert security, and log incident", complexity: "complex", use_case: "operations" },
  { idea: "When water leak sensor activates, then shut off valve, alert maintenance, and notify insurance", complexity: "complex", use_case: "operations" },
  { idea: "When air quality drops below threshold, then increase ventilation and alert facility manager", complexity: "medium", use_case: "operations" },
  { idea: "When freezer temperature rises above safe level, then alert staff and log compliance incident", complexity: "medium", use_case: "operations" },
  
  // Project Management
  { idea: "When project scope change is requested, then log impact, update timeline estimate, and route for approval", complexity: "complex", use_case: "operations" },
  { idea: "When dependency task is delayed, then cascade update dependent tasks and notify affected owners", complexity: "complex", use_case: "productivity" },
  { idea: "When sprint capacity is exceeded, then move lowest priority items to backlog and notify stakeholders", complexity: "medium", use_case: "development" },
  { idea: "When team member joins project, then share access to all project resources and schedule onboarding", complexity: "medium", use_case: "productivity" },
  { idea: "When project enters red status, then escalate to leadership and schedule recovery meeting", complexity: "medium", use_case: "operations" },
  { idea: "When milestone date is moved, then update all downstream dependencies and notify stakeholders", complexity: "complex", use_case: "operations" },
  { idea: "When resource conflict is detected, then propose alternative allocations and flag for review", complexity: "complex", use_case: "operations" },
  
  // Communication & Collaboration
  { idea: "When urgent message is unread for 30 minutes, then escalate via phone call", complexity: "medium", use_case: "productivity" },
  { idea: "When email thread exceeds 10 replies, then suggest scheduling a meeting", complexity: "simple", use_case: "productivity" },
  { idea: "When document comment mentions someone, then notify them and track response", complexity: "simple", use_case: "productivity" },
  { idea: "When meeting notes are finalized, then distribute to attendees and archive in project folder", complexity: "medium", use_case: "productivity" },
  { idea: "When out of office is set, then redirect urgent items to backup and pause routine notifications", complexity: "medium", use_case: "productivity" },
  { idea: "When external stakeholder is added to project, then verify NDA status and limit access appropriately", complexity: "complex", use_case: "legal" },
  
  // Data & Analytics
  { idea: "When dashboard metric exceeds threshold, then highlight anomaly and send alert to owner", complexity: "medium", use_case: "operations" },
  { idea: "When data pipeline fails, then retry, log error, and alert data team if unresolved", complexity: "complex", use_case: "devops" },
  { idea: "When report generation completes, then distribute to subscribers and archive", complexity: "simple", use_case: "productivity" },
  { idea: "When data quality check fails, then quarantine records, alert owner, and log for audit", complexity: "complex", use_case: "operations" },
  { idea: "When forecast accuracy drops, then trigger model retraining and notify data science team", complexity: "complex", use_case: "operations" },
  { idea: "When A/B test reaches statistical significance, then declare winner and deploy change", complexity: "complex", use_case: "development" },
  
  // Supply Chain & Logistics
  { idea: "When shipment tracking shows delay, then proactively notify customer and update ETA", complexity: "medium", use_case: "customer service" },
  { idea: "When supplier lead time increases, then adjust reorder point and notify procurement", complexity: "medium", use_case: "operations" },
  { idea: "When carrier rate increases, then compare alternatives and negotiate or switch providers", complexity: "complex", use_case: "finance" },
  { idea: "When customs clearance is delayed, then notify recipient and provide required documentation", complexity: "complex", use_case: "operations" },
  { idea: "When pallet count mismatch is detected, then hold shipment, recount, and document discrepancy", complexity: "medium", use_case: "operations" },
  { idea: "When last mile delivery fails, then schedule retry, notify customer, and log delivery attempt", complexity: "medium", use_case: "operations" },
  { idea: "When warehouse temperature exceeds range, then alert staff and activate backup cooling", complexity: "complex", use_case: "operations" },
  
  // Social Media & Community
  { idea: "When post goes viral, then monitor comments, prepare response templates, and alert PR", complexity: "complex", use_case: "marketing" },
  { idea: "When community member is reported, then review content, apply policy, and communicate decision", complexity: "complex", use_case: "customer service" },
  { idea: "When hashtag campaign launches, then track mentions, collect UGC, and compile highlights", complexity: "complex", use_case: "marketing" },
  { idea: "When social DM contains complaint, then create support ticket and respond within 2 hours", complexity: "medium", use_case: "customer service" },
  { idea: "When influencer mentions brand, then log engagement, assess sentiment, and consider partnership", complexity: "complex", use_case: "marketing" },
  { idea: "When negative review appears on social, then acknowledge publicly and move to private resolution", complexity: "medium", use_case: "customer service" },
  
  // Subscription & Billing
  { idea: "When subscription upgrades, then provision new features, update billing, and send confirmation", complexity: "complex", use_case: "operations" },
  { idea: "When promo code is applied, then verify eligibility, apply discount, and log usage", complexity: "medium", use_case: "sales" },
  { idea: "When billing cycle changes, then prorate charges, update schedule, and notify customer", complexity: "complex", use_case: "finance" },
  { idea: "When usage hits plan limit, then notify customer and offer upgrade or add-on", complexity: "medium", use_case: "sales" },
  { idea: "When customer requests downgrade, then schedule for next billing cycle and confirm details", complexity: "medium", use_case: "customer service" },
  { idea: "When annual payment is due, then send reminder 30 days before and offer payment plan", complexity: "medium", use_case: "finance" },
  { idea: "When trial converts to paid, then activate full features and send onboarding sequence", complexity: "medium", use_case: "sales" },
  
  // Quality & Testing
  { idea: "When QA test fails, then block release, assign to developer, and update test report", complexity: "medium", use_case: "development" },
  { idea: "When regression is detected, then bisect commits to find culprit and notify author", complexity: "complex", use_case: "development" },
  { idea: "When user acceptance testing completes, then compile feedback and create fix priorities", complexity: "complex", use_case: "development" },
  { idea: "When beta feedback is submitted, then categorize, prioritize, and route to product team", complexity: "medium", use_case: "development" },
  { idea: "When load test shows performance degradation, then analyze bottlenecks and create optimization tasks", complexity: "complex", use_case: "devops" },
  { idea: "When accessibility scan finds issues, then create tickets for each violation by severity", complexity: "medium", use_case: "development" },
  
  // Events & Conferences
  { idea: "When event speaker confirms, then add to agenda, create bio page, and send logistics info", complexity: "complex", use_case: "marketing" },
  { idea: "When event attendee checks in, then print badge, update count, and send welcome message", complexity: "medium", use_case: "operations" },
  { idea: "When session feedback is submitted, then aggregate scores and share with speaker", complexity: "medium", use_case: "operations" },
  { idea: "When event networking app match is made, then notify both parties and suggest meeting time", complexity: "medium", use_case: "operations" },
  { idea: "When event recording is processed, then upload to platform, notify registrants, and add to library", complexity: "complex", use_case: "marketing" },
  { idea: "When sponsor contract is signed, then send deliverables checklist and schedule fulfillment", complexity: "medium", use_case: "sales" },
  
  // Healthcare & Wellness
  { idea: "When wellness check is due, then send reminder to employee and schedule appointment", complexity: "simple", use_case: "hr" },
  { idea: "When medication reminder is triggered, then send notification and log acknowledgment", complexity: "simple", use_case: "customer service" },
  { idea: "When health goal is achieved, then celebrate milestone and suggest next goal", complexity: "simple", use_case: "customer service" },
  { idea: "When ergonomic assessment is requested, then schedule evaluation and order equipment if approved", complexity: "medium", use_case: "hr" },
  { idea: "When mental health day is taken, then protect privacy, update calendar, and suggest resources", complexity: "medium", use_case: "hr" },
  
  // Real Estate & Property
  { idea: "When rental application is submitted, then screen tenant, verify income, and generate report", complexity: "complex", use_case: "operations" },
  { idea: "When move-out inspection is scheduled, then send checklist to tenant and assign inspector", complexity: "medium", use_case: "operations" },
  { idea: "When security deposit calculation is complete, then generate statement and process refund or charges", complexity: "complex", use_case: "finance" },
  { idea: "When HOA violation is reported, then document issue, notify owner, and track resolution", complexity: "medium", use_case: "operations" },
  { idea: "When property tax assessment changes, then update escrow calculation and notify owner", complexity: "complex", use_case: "finance" },
  
  // Insurance & Claims
  { idea: "When claim is submitted, then assign adjuster, request documentation, and set SLA timer", complexity: "complex", use_case: "operations" },
  { idea: "When policy renewal is due, then pull loss history, calculate new premium, and send quote", complexity: "complex", use_case: "finance" },
  { idea: "When coverage gap is detected, then notify policyholder and suggest additional coverage", complexity: "medium", use_case: "sales" },
  { idea: "When claim is approved, then schedule payment, update reserves, and notify claimant", complexity: "complex", use_case: "finance" },
  { idea: "When fraud indicator is flagged, then escalate to SIU and pause claim processing", complexity: "complex", use_case: "operations" },
  
  // Travel & Hospitality
  { idea: "When guest checks in, then activate room key, update housekeeping status, and send welcome message", complexity: "complex", use_case: "customer service" },
  { idea: "When flight itinerary changes, then rebook connecting services and notify traveler", complexity: "complex", use_case: "customer service" },
  { idea: "When room service order is placed, then route to kitchen, assign delivery, and track completion", complexity: "medium", use_case: "operations" },
  { idea: "When guest requests late checkout, then check availability, update housekeeping, and confirm", complexity: "medium", use_case: "customer service" },
  { idea: "When travel policy violation is detected, then flag expense, require justification, and route to manager", complexity: "medium", use_case: "finance" },
  { idea: "When loyalty status changes, then update member profile and send new benefits summary", complexity: "medium", use_case: "marketing" },
  
  // Construction & Field Services
  { idea: "When permit is approved, then notify project manager, update schedule, and document in file", complexity: "medium", use_case: "operations" },
  { idea: "When inspection is scheduled, then confirm with inspector, prepare site, and notify stakeholders", complexity: "medium", use_case: "operations" },
  { idea: "When change order is approved, then update budget, revise schedule, and notify subcontractors", complexity: "complex", use_case: "operations" },
  { idea: "When materials are delivered, then verify against PO, update inventory, and release payment milestone", complexity: "complex", use_case: "operations" },
  { idea: "When punch list item is completed, then document with photos, get sign-off, and update status", complexity: "medium", use_case: "operations" },
  { idea: "When field worker clocks in on site, then verify location, start job timer, and notify dispatch", complexity: "medium", use_case: "hr" },
  
  // Automotive & Fleet
  { idea: "When vehicle maintenance is due, then schedule service, notify driver, and arrange replacement", complexity: "medium", use_case: "operations" },
  { idea: "When fuel card transaction exceeds limit, then flag for review and notify fleet manager", complexity: "medium", use_case: "finance" },
  { idea: "When driver violation is recorded, then document incident, notify HR, and schedule retraining", complexity: "complex", use_case: "hr" },
  { idea: "When vehicle inspection expires, then block dispatch, schedule inspection, and notify compliance", complexity: "medium", use_case: "operations" },
  { idea: "When GPS shows vehicle deviation from route, then alert dispatch and request explanation", complexity: "medium", use_case: "operations" },
  { idea: "When accident is reported, then gather details, notify insurance, and arrange tow if needed", complexity: "complex", use_case: "operations" },
  
  // Banking & Financial Services
  { idea: "When suspicious transaction is detected, then freeze account, contact customer, and log for review", complexity: "complex", use_case: "finance" },
  { idea: "When loan application is submitted, then run credit check, verify documents, and assign underwriter", complexity: "complex", use_case: "finance" },
  { idea: "When wire transfer request is received, then verify identity, check compliance, and process", complexity: "complex", use_case: "finance" },
  { idea: "When CD maturity approaches, then notify customer and present renewal or withdrawal options", complexity: "medium", use_case: "finance" },
  { idea: "When account balance drops below threshold, then send low balance alert and suggest transfer", complexity: "simple", use_case: "customer service" },
  { idea: "When recurring payment fails, then retry next business day and notify account holder", complexity: "medium", use_case: "finance" },
  
  // Agriculture & Farming
  { idea: "When soil moisture drops below level, then trigger irrigation and log water usage", complexity: "medium", use_case: "operations" },
  { idea: "When weather forecast shows frost, then alert farmer and suggest protective measures", complexity: "medium", use_case: "operations" },
  { idea: "When crop yield data is collected, then update projections and adjust harvest schedule", complexity: "complex", use_case: "operations" },
  { idea: "When livestock health anomaly is detected, then alert veterinarian and isolate animal", complexity: "complex", use_case: "operations" },
  { idea: "When equipment sensor shows malfunction, then schedule repair and reroute field operations", complexity: "medium", use_case: "operations" },
  
  // Energy & Utilities
  { idea: "When meter reading is submitted, then validate data, calculate bill, and schedule distribution", complexity: "complex", use_case: "finance" },
  { idea: "When outage is reported, then create ticket, dispatch crew, and update customers on ETA", complexity: "complex", use_case: "customer service" },
  { idea: "When usage spikes abnormally, then alert customer and check for leaks or malfunctions", complexity: "medium", use_case: "customer service" },
  { idea: "When renewable energy target is met, then update sustainability report and notify stakeholders", complexity: "medium", use_case: "operations" },
  { idea: "When grid demand peaks, then activate demand response and notify participating customers", complexity: "complex", use_case: "operations" },
  
  // Telecommunications
  { idea: "When network outage is detected, then alert NOC, update status page, and notify affected customers", complexity: "complex", use_case: "devops" },
  { idea: "When data usage approaches limit, then send warning and offer upgrade options", complexity: "simple", use_case: "customer service" },
  { idea: "When porting request is received, then verify account, schedule port date, and send confirmation", complexity: "medium", use_case: "operations" },
  { idea: "When equipment upgrade is available, then notify eligible customers and schedule installation", complexity: "medium", use_case: "marketing" },
  { idea: "When service ticket is escalated, then page on-call technician and track response time", complexity: "medium", use_case: "customer service" },
  
  // Government & Public Sector
  { idea: "When permit application is received, then assign reviewer, start SLA timer, and send acknowledgment", complexity: "medium", use_case: "operations" },
  { idea: "When public comment period opens, then publish notice, collect submissions, and compile summary", complexity: "complex", use_case: "operations" },
  { idea: "When FOIA request is received, then log request, assign coordinator, and track deadline", complexity: "complex", use_case: "legal" },
  { idea: "When citizen complaint is filed, then create case, assign investigator, and acknowledge receipt", complexity: "medium", use_case: "customer service" },
  { idea: "When budget amendment is proposed, then route through approval chain and document changes", complexity: "complex", use_case: "finance" },
  
  // Cybersecurity
  { idea: "When login anomaly is detected, then challenge with MFA and alert security operations", complexity: "complex", use_case: "devops" },
  { idea: "When phishing email is reported, then analyze headers, block sender domain, and alert all users", complexity: "complex", use_case: "devops" },
  { idea: "When access request is submitted, then verify need, check compliance, and provision if approved", complexity: "complex", use_case: "devops" },
  { idea: "When employee leaves, then revoke all access, export audit logs, and confirm deactivation", complexity: "complex", use_case: "hr" },
  { idea: "When vulnerability scan completes, then prioritize findings, create tickets, and track remediation", complexity: "complex", use_case: "devops" },
  { idea: "When encryption certificate is about to expire, then auto-renew and verify deployment", complexity: "medium", use_case: "devops" },
  
  // Media & Entertainment
  { idea: "When content is uploaded, then scan for copyright, generate thumbnails, and queue for encoding", complexity: "complex", use_case: "operations" },
  { idea: "When royalty period ends, then calculate payments, generate statements, and schedule distribution", complexity: "complex", use_case: "finance" },
  { idea: "When content flags are received, then review, apply policy decision, and notify uploader", complexity: "complex", use_case: "operations" },
  { idea: "When premiere date approaches, then ramp up marketing, brief support team, and prepare infrastructure", complexity: "complex", use_case: "marketing" },
  { idea: "When viewer drops off, then log engagement point and suggest content improvements", complexity: "medium", use_case: "marketing" },
  
  // Research & Development
  { idea: "When patent search is completed, then summarize prior art and schedule strategy meeting", complexity: "complex", use_case: "legal" },
  { idea: "When research milestone is achieved, then document findings, update sponsors, and archive data", complexity: "complex", use_case: "operations" },
  { idea: "When lab equipment calibration is due, then schedule service and block dependent experiments", complexity: "medium", use_case: "operations" },
  { idea: "When prototype testing completes, then compile results, create report, and schedule design review", complexity: "complex", use_case: "development" },
  { idea: "When grant funding is received, then set up cost centers, notify PI, and schedule kickoff", complexity: "complex", use_case: "finance" },
  
  // Franchising
  { idea: "When franchise inquiry is received, then qualify lead, send FDD, and schedule discovery call", complexity: "medium", use_case: "sales" },
  { idea: "When franchisee reports issue, then create support ticket, assign field consultant, and track resolution", complexity: "medium", use_case: "customer service" },
  { idea: "When royalty payment is late, then send reminder, assess late fee, and escalate if needed", complexity: "medium", use_case: "finance" },
  { idea: "When brand standards violation is found, then document issue, notify owner, and set correction deadline", complexity: "medium", use_case: "operations" },
  { idea: "When new unit opens, then activate systems, send welcome kit, and schedule launch support", complexity: "complex", use_case: "operations" },
  
  // Professional Services
  { idea: "When client engagement begins, then create matter, set up billing codes, and assign team", complexity: "complex", use_case: "operations" },
  { idea: "When billable time entry is submitted, then validate against budget and route for partner review", complexity: "medium", use_case: "finance" },
  { idea: "When court filing deadline approaches, then remind team, prepare documents, and confirm filing", complexity: "complex", use_case: "legal" },
  { idea: "When expert witness is retained, then verify credentials, execute agreement, and schedule prep sessions", complexity: "complex", use_case: "legal" },
  { idea: "When client matter closes, then generate final invoice, archive documents, and request feedback", complexity: "complex", use_case: "operations" },
  
  // Veterinary & Pet Services
  { idea: "When vaccination is due, then send reminder to pet owner and reserve appointment slot", complexity: "simple", use_case: "customer service" },
  { idea: "When prescription refill is needed, then verify with vet, process order, and notify owner", complexity: "medium", use_case: "customer service" },
  { idea: "When boarding reservation is made, then confirm requirements, check vaccination records, and send prep info", complexity: "medium", use_case: "customer service" },
  { idea: "When pet emergency is reported, then triage urgency, prepare exam room, and alert on-call vet", complexity: "complex", use_case: "customer service" },
  { idea: "When grooming appointment completes, then notify owner for pickup and send care instructions", complexity: "simple", use_case: "customer service" },
  
  // Gaming & eSports
  { idea: "When player reports bug, then create ticket, attempt repro, and assign to development queue", complexity: "medium", use_case: "development" },
  { idea: "When tournament registration opens, then verify eligibility, collect entry fee, and assign bracket", complexity: "complex", use_case: "operations" },
  { idea: "When match result is submitted, then update standings, calculate rankings, and notify players", complexity: "complex", use_case: "operations" },
  { idea: "When toxic behavior is reported, then review evidence, apply sanctions, and notify parties", complexity: "complex", use_case: "customer service" },
  { idea: "When season ends, then calculate rewards, distribute prizes, and archive leaderboards", complexity: "complex", use_case: "operations" },
  
  // Fitness & Sports
  { idea: "When class cancellation occurs, then notify registered members and offer alternatives", complexity: "medium", use_case: "customer service" },
  { idea: "When membership freeze is requested, then pause billing, update access, and schedule resume date", complexity: "medium", use_case: "customer service" },
  { idea: "When trainer assignment changes, then notify client, update schedule, and transfer notes", complexity: "medium", use_case: "customer service" },
  { idea: "When equipment maintenance is logged, then update inventory status and notify affected classes", complexity: "medium", use_case: "operations" },
  { idea: "When member achieves fitness milestone, then send congratulations and post to community board", complexity: "simple", use_case: "marketing" },
  
  // Printing & Publishing
  { idea: "When print job is submitted, then validate files, check stock, and estimate completion time", complexity: "complex", use_case: "operations" },
  { idea: "When proof is approved, then release to production and schedule shipping", complexity: "medium", use_case: "operations" },
  { idea: "When manuscript is submitted, then assign editor, create project timeline, and send acknowledgment", complexity: "complex", use_case: "operations" },
  { idea: "When ISBN is assigned, then update metadata, register with distributors, and notify author", complexity: "medium", use_case: "operations" },
  { idea: "When book launch date approaches, then coordinate marketing, finalize distribution, and brief sales", complexity: "complex", use_case: "marketing" },
  
  // Cleaning & Janitorial
  { idea: "When cleaning job is completed, then log completion photos, notify client, and request sign-off", complexity: "medium", use_case: "operations" },
  { idea: "When supplies run low at site, then create restock order and schedule delivery", complexity: "simple", use_case: "operations" },
  { idea: "When client reports issue with service, then schedule reinspection and follow up within 24 hours", complexity: "medium", use_case: "customer service" },
  { idea: "When weather affects outdoor work, then reschedule crews and notify affected clients", complexity: "medium", use_case: "operations" },
  { idea: "When quality audit finds deficiency, then retrain staff and schedule follow-up inspection", complexity: "medium", use_case: "operations" },
  
  // Photography & Videography  
  { idea: "When shoot is booked, then send questionnaire, confirm logistics, and prepare equipment list", complexity: "medium", use_case: "operations" },
  { idea: "When raw files are uploaded, then backup to cloud, organize by project, and notify editor", complexity: "medium", use_case: "operations" },
  { idea: "When client selects final images, then process edits, prepare delivery, and generate invoice", complexity: "complex", use_case: "operations" },
  { idea: "When album design is approved, then submit print order and schedule delivery notification", complexity: "medium", use_case: "operations" },
  { idea: "When usage rights expire, then notify client and offer license extension", complexity: "medium", use_case: "sales" },
  
  // Catering & Food Service
  { idea: "When dietary restriction is noted, then flag for kitchen, update menu options, and confirm with guest", complexity: "medium", use_case: "customer service" },
  { idea: "When event headcount changes, then recalculate portions, adjust staffing, and update quote", complexity: "complex", use_case: "operations" },
  { idea: "When food safety inspection is due, then prepare documentation, schedule inspector, and brief staff", complexity: "medium", use_case: "operations" },
  { idea: "When ingredient cost increases significantly, then recalculate menu pricing and notify sales team", complexity: "complex", use_case: "finance" },
  { idea: "When leftover food is available, then coordinate donation pickup and document tax deduction", complexity: "medium", use_case: "operations" },
  
  // Security Services
  { idea: "When alarm is triggered, then dispatch patrol, notify contact list, and document response", complexity: "complex", use_case: "operations" },
  { idea: "When guard shift starts, then log check-in, verify credentials, and brief on site conditions", complexity: "medium", use_case: "operations" },
  { idea: "When incident report is filed, then review for completeness, escalate if serious, and archive", complexity: "medium", use_case: "operations" },
  { idea: "When patrol checkpoint is missed, then alert supervisor and attempt contact with officer", complexity: "medium", use_case: "operations" },
  { idea: "When visitor badge expires, then disable access, notify host, and log visitor exit", complexity: "medium", use_case: "operations" },
  
  // Childcare & Education Early
  { idea: "When child is dropped off, then log attendance, note any health concerns, and confirm authorized pickup", complexity: "medium", use_case: "operations" },
  { idea: "When incident occurs with child, then document details, notify parents immediately, and file report", complexity: "complex", use_case: "operations" },
  { idea: "When tuition payment is late, then send reminder, apply late fee, and notify director if unresolved", complexity: "medium", use_case: "finance" },
  { idea: "When classroom ratio exceeds limit, then alert director and reassign staff immediately", complexity: "complex", use_case: "operations" },
  { idea: "When parent feedback is submitted, then acknowledge receipt, route to appropriate staff, and track resolution", complexity: "medium", use_case: "customer service" },
  
  // Dental Practice
  { idea: "When patient treatment plan is created, then estimate insurance coverage and present payment options", complexity: "complex", use_case: "finance" },
  { idea: "When dental emergency calls in, then assess urgency, find same-day slot, and prep emergency kit", complexity: "complex", use_case: "customer service" },
  { idea: "When cleaning reminder is due, then contact patient, schedule appointment, and send confirmation", complexity: "simple", use_case: "customer service" },
  { idea: "When crown is ready from lab, then notify patient, schedule seating appointment, and confirm materials", complexity: "medium", use_case: "customer service" },
  { idea: "When insurance claim is denied, then analyze reason, appeal if valid, and notify patient of balance", complexity: "complex", use_case: "finance" },
  
  // Spa & Wellness
  { idea: "When treatment room becomes available early, then notify waiting clients and offer upgrade", complexity: "simple", use_case: "customer service" },
  { idea: "When client has allergies noted, then flag for all service providers and adjust products used", complexity: "medium", use_case: "customer service" },
  { idea: "When gift card is nearing expiration, then notify holder and suggest booking appointment", complexity: "simple", use_case: "marketing" },
  { idea: "When retail product runs low, then create reorder, adjust display, and suggest alternatives to staff", complexity: "medium", use_case: "operations" },
  { idea: "When therapist certification is expiring, then notify them, pause bookings if needed, and track renewal", complexity: "medium", use_case: "hr" },
  
  // Moving & Storage
  { idea: "When moving estimate is requested, then schedule walkthrough, calculate quote, and send proposal", complexity: "complex", use_case: "sales" },
  { idea: "When storage payment is late, then send notice, lock unit access if prolonged, and notify customer", complexity: "medium", use_case: "finance" },
  { idea: "When truck is loaded, then update inventory, generate manifest, and send tracking to customer", complexity: "complex", use_case: "operations" },
  { idea: "When damage claim is filed, then document with photos, assess value, and process settlement", complexity: "complex", use_case: "customer service" },
  { idea: "When storage unit lease ends, then schedule cleanout, inspect condition, and process deposit return", complexity: "medium", use_case: "operations" },
  
  // Lawn Care & Landscaping
  { idea: "When service visit is completed, then log work done, upload photos, and notify homeowner", complexity: "medium", use_case: "operations" },
  { idea: "When seasonal service is due, then contact customers, schedule crews, and order materials", complexity: "complex", use_case: "operations" },
  { idea: "When irrigation system issue is found, then document problem, quote repair, and schedule return visit", complexity: "medium", use_case: "customer service" },
  { idea: "When crew finishes early, then reassign to next job or schedule additional property", complexity: "medium", use_case: "operations" },
  { idea: "When customer skips payment, then suspend service, send notice, and offer payment plan", complexity: "medium", use_case: "finance" },
  
  // Pest Control
  { idea: "When treatment is scheduled, then send prep instructions to customer and confirm appointment", complexity: "simple", use_case: "customer service" },
  { idea: "When follow-up treatment is due, then contact customer, schedule visit, and prep materials", complexity: "medium", use_case: "operations" },
  { idea: "When pest activity is reported between services, then schedule callback and assess additional treatment", complexity: "medium", use_case: "customer service" },
  { idea: "When technician license expires, then suspend assignments, notify technician, and track renewal", complexity: "medium", use_case: "hr" },
  { idea: "When customer requests organic treatment, then verify product availability and adjust service plan", complexity: "medium", use_case: "customer service" },
  
  // Plumbing & HVAC
  { idea: "When emergency call comes in, then dispatch nearest available technician and notify customer of ETA", complexity: "complex", use_case: "operations" },
  { idea: "When job estimate is approved, then order parts, schedule installation, and collect deposit", complexity: "complex", use_case: "operations" },
  { idea: "When maintenance agreement expires, then send renewal offer and highlight savings", complexity: "medium", use_case: "sales" },
  { idea: "When warranty claim is submitted, then verify coverage, order replacement part, and schedule service", complexity: "complex", use_case: "customer service" },
  { idea: "When permit is required, then file application, track approval, and schedule work once cleared", complexity: "complex", use_case: "operations" },
  
  // Electrical Services
  { idea: "When electrical inspection is needed, then submit request, prepare documentation, and schedule appointment", complexity: "medium", use_case: "operations" },
  { idea: "When panel upgrade is completed, then update customer records, file permits, and send safety guide", complexity: "complex", use_case: "operations" },
  { idea: "When surge protector warranty expires, then notify customer and recommend replacement", complexity: "simple", use_case: "customer service" },
  { idea: "When generator maintenance is due, then schedule service, test run, and document results", complexity: "medium", use_case: "operations" },
  { idea: "When commercial account goes inactive, then reach out to reestablish relationship and offer incentive", complexity: "medium", use_case: "sales" },
  
  // Roofing & Exterior
  { idea: "When storm is forecast, then notify customers of inspection availability and prep emergency crews", complexity: "complex", use_case: "operations" },
  { idea: "When roof inspection is completed, then generate report with photos, estimate repairs, and send to customer", complexity: "complex", use_case: "operations" },
  { idea: "When gutter cleaning is scheduled, then confirm access, check weather, and dispatch crew", complexity: "simple", use_case: "operations" },
  { idea: "When insurance claim is filed, then gather documentation, submit to adjuster, and track status", complexity: "complex", use_case: "finance" },
  { idea: "When project warranty period ends, then send maintenance reminder and offer inspection", complexity: "simple", use_case: "marketing" },
  
  // Window & Door Installation
  { idea: "When measurement appointment is booked, then confirm details, assign technician, and send prep instructions", complexity: "medium", use_case: "operations" },
  { idea: "When custom order arrives, then inspect for damage, notify customer, and schedule installation", complexity: "medium", use_case: "operations" },
  { idea: "When installation is completed, then walk through with customer, collect sign-off, and process final payment", complexity: "complex", use_case: "operations" },
  { idea: "When lead time increases from supplier, then update pending orders and notify affected customers", complexity: "medium", use_case: "customer service" },
  { idea: "When energy rebate program launches, then notify eligible customers and assist with application", complexity: "medium", use_case: "marketing" },
  
  // Interior Design
  { idea: "When design consultation is booked, then send questionnaire, prepare mood boards, and confirm meeting", complexity: "medium", use_case: "operations" },
  { idea: "When furniture order is placed, then track delivery, coordinate installation, and update project timeline", complexity: "complex", use_case: "operations" },
  { idea: "When project phase completes, then schedule client review, prepare presentation, and gather feedback", complexity: "complex", use_case: "operations" },
  { idea: "When vendor sample arrives, then photograph, add to library, and notify designer", complexity: "simple", use_case: "operations" },
  { idea: "When final reveal is scheduled, then coordinate all deliveries, stage space, and prepare walkthrough", complexity: "complex", use_case: "operations" },
  
  // Tutoring & Test Prep
  { idea: "When student signs up, then assess level, match with tutor, and schedule first session", complexity: "complex", use_case: "customer service" },
  { idea: "When practice test is completed, then score results, identify weak areas, and adjust study plan", complexity: "complex", use_case: "customer service" },
  { idea: "When session is cancelled last minute, then attempt to reschedule and apply cancellation policy", complexity: "medium", use_case: "customer service" },
  { idea: "When target test date approaches, then intensify schedule, send preparation tips, and confirm registration", complexity: "medium", use_case: "customer service" },
  { idea: "When student achieves score goal, then celebrate success, request testimonial, and close engagement", complexity: "simple", use_case: "marketing" },
  
  // Music Lessons
  { idea: "When student enrolls, then assess skill level, assign instructor, and provide practice materials", complexity: "medium", use_case: "customer service" },
  { idea: "When recital date is set, then assign performance slots, send invitations, and coordinate logistics", complexity: "complex", use_case: "operations" },
  { idea: "When instrument rental is due for return, then send reminder, schedule inspection, and process deposit", complexity: "medium", use_case: "operations" },
  { idea: "When practice log is submitted, then review with instructor and adjust lesson plan accordingly", complexity: "medium", use_case: "customer service" },
  { idea: "When theory exam is passed, then update student record, issue certificate, and recommend next level", complexity: "medium", use_case: "customer service" },
  
  // Art Studios & Classes
  { idea: "When class materials are needed, then check inventory, order supplies, and prep kits for students", complexity: "medium", use_case: "operations" },
  { idea: "When artwork is completed, then photograph for portfolio, offer framing, and schedule pickup", complexity: "medium", use_case: "customer service" },
  { idea: "When workshop fills up, then close registration, create waitlist, and consider adding session", complexity: "medium", use_case: "operations" },
  { idea: "When exhibition space is booked, then confirm dates, send artist requirements, and coordinate setup", complexity: "complex", use_case: "operations" },
  { idea: "When commission request is received, then gather requirements, provide quote, and set timeline expectations", complexity: "complex", use_case: "sales" },
  
  // === ADDITIONAL BATCH 3 (200+ more to reach 1000) ===
  
  // Accounting & Bookkeeping
  { idea: "When journal entry is created, then validate debits and credits balance and route for approval", complexity: "medium", use_case: "finance" },
  { idea: "When depreciation schedule runs, then post entries to GL and update asset register", complexity: "complex", use_case: "finance" },
  { idea: "When intercompany transaction occurs, then create matching entries in both entities", complexity: "complex", use_case: "finance" },
  { idea: "When accrual reversal is due, then post reversing entry and notify preparer", complexity: "medium", use_case: "finance" },
  { idea: "When bank feeds are downloaded, then categorize transactions and suggest matches", complexity: "complex", use_case: "finance" },
  { idea: "When accounts receivable ages past 90 days, then write off to bad debt and notify collections", complexity: "complex", use_case: "finance" },
  { idea: "When 1099 threshold is reached for vendor, then flag for year-end reporting", complexity: "medium", use_case: "finance" },
  
  // Sales Enablement
  { idea: "When new sales collateral is uploaded, then notify sales team and add to resource library", complexity: "simple", use_case: "sales" },
  { idea: "When competitive battlecard is updated, then push to CRM and notify account teams", complexity: "medium", use_case: "sales" },
  { idea: "When product demo environment is requested, then provision instance and send credentials", complexity: "complex", use_case: "sales" },
  { idea: "When sales certification is completed, then update profile and unlock territory assignment", complexity: "medium", use_case: "sales" },
  { idea: "When prospect downloads whitepaper, then add to nurture sequence and assign SDR", complexity: "medium", use_case: "sales" },
  { idea: "When reference customer is requested, then match criteria, confirm availability, and schedule call", complexity: "complex", use_case: "sales" },
  { idea: "When sales forecast is due, then aggregate pipeline data and generate report draft", complexity: "complex", use_case: "sales" },
  
  // Customer Onboarding
  { idea: "When kickoff call is completed, then create project plan and share with customer", complexity: "medium", use_case: "customer service" },
  { idea: "When implementation milestone is reached, then update customer and schedule next phase", complexity: "medium", use_case: "customer service" },
  { idea: "When training session is completed, then send recording, quiz link, and certificate", complexity: "medium", use_case: "customer service" },
  { idea: "When go-live date is confirmed, then coordinate all teams and send launch checklist", complexity: "complex", use_case: "customer service" },
  { idea: "When post-launch check-in is due, then contact customer and gather initial feedback", complexity: "simple", use_case: "customer service" },
  { idea: "When adoption metrics fall below target, then alert CSM and schedule intervention call", complexity: "medium", use_case: "customer service" },
  { idea: "When customer expansion opportunity is identified, then brief sales and schedule value review", complexity: "medium", use_case: "sales" },
  
  // Content Operations
  { idea: "When content brief is approved, then assign to writer and set deadline", complexity: "simple", use_case: "marketing" },
  { idea: "When draft is submitted, then route through review chain and track feedback", complexity: "medium", use_case: "marketing" },
  { idea: "When content is approved for publication, then schedule across channels and notify team", complexity: "complex", use_case: "marketing" },
  { idea: "When content performance is reviewed, then generate insights and recommend optimization", complexity: "complex", use_case: "marketing" },
  { idea: "When content audit is due, then flag outdated pieces and prioritize updates", complexity: "complex", use_case: "marketing" },
  { idea: "When SEO opportunity is identified, then create optimization brief and assign writer", complexity: "medium", use_case: "marketing" },
  { idea: "When content syndication partner publishes, then track metrics and update attribution", complexity: "medium", use_case: "marketing" },
  
  // Partner & Channel Management
  { idea: "When partner application is received, then verify criteria and route for approval", complexity: "medium", use_case: "sales" },
  { idea: "When partner deal is registered, then verify no conflicts and protect for deal term", complexity: "medium", use_case: "sales" },
  { idea: "When partner certification expires, then suspend benefits and send renewal notice", complexity: "medium", use_case: "sales" },
  { idea: "When partner incentive is earned, then calculate payout and submit for processing", complexity: "complex", use_case: "finance" },
  { idea: "When partner lead is submitted, then validate data and route to inside sales", complexity: "medium", use_case: "sales" },
  { idea: "When partner tier review is due, then evaluate metrics and determine status", complexity: "complex", use_case: "sales" },
  { idea: "When partner portal content is updated, then notify partners and track engagement", complexity: "medium", use_case: "marketing" },
  
  // Procurement & Sourcing
  { idea: "When purchase requisition is created, then check against contracts and recommend suppliers", complexity: "complex", use_case: "operations" },
  { idea: "When RFP response is received, then score against criteria and compile summary", complexity: "complex", use_case: "operations" },
  { idea: "When vendor is selected, then initiate contracting process and notify procurement", complexity: "medium", use_case: "operations" },
  { idea: "When contract negotiation completes, then finalize documents and schedule kickoff", complexity: "complex", use_case: "legal" },
  { idea: "When supplier scorecard is due, then gather metrics and generate performance report", complexity: "complex", use_case: "operations" },
  { idea: "When sole source justification is submitted, then route for compliance approval", complexity: "medium", use_case: "operations" },
  { idea: "When contract renewal is approaching, then analyze spend, gather feedback, and recommend action", complexity: "complex", use_case: "operations" },
  
  // Document Management
  { idea: "When document is finalized, then convert to PDF, apply watermark, and archive original", complexity: "medium", use_case: "operations" },
  { idea: "When version conflict is detected, then lock document and notify collaborators", complexity: "medium", use_case: "productivity" },
  { idea: "When retention period expires, then move to archive or delete per policy", complexity: "complex", use_case: "legal" },
  { idea: "When document access is requested, then verify authorization and grant or deny", complexity: "medium", use_case: "operations" },
  { idea: "When document template is updated, then version and notify all users", complexity: "simple", use_case: "operations" },
  { idea: "When classification label is applied, then enforce appropriate access controls", complexity: "complex", use_case: "legal" },
  { idea: "When document export is requested, then apply DLP policies and log action", complexity: "complex", use_case: "legal" },
  
  // Facilities & Workplace
  { idea: "When desk reservation is made, then confirm availability and update floor plan", complexity: "simple", use_case: "operations" },
  { idea: "When visitor arrives, then check in, notify host, and print badge", complexity: "medium", use_case: "operations" },
  { idea: "When parking spot is requested, then check availability and assign space", complexity: "simple", use_case: "operations" },
  { idea: "When building access is granted, then provision badge and log authorization", complexity: "medium", use_case: "operations" },
  { idea: "When after-hours access is requested, then require manager approval and log entry", complexity: "medium", use_case: "operations" },
  { idea: "When cleaning service reports issue, then create maintenance ticket and notify facilities", complexity: "medium", use_case: "operations" },
  { idea: "When office move is scheduled, then coordinate IT, facilities, and communications", complexity: "complex", use_case: "operations" },
  
  // Learning & Training
  { idea: "When new hire starts, then assign required training modules and set deadlines", complexity: "medium", use_case: "hr" },
  { idea: "When course is completed, then record achievement and recommend next course", complexity: "simple", use_case: "hr" },
  { idea: "When compliance training is due, then send assignment and track completion", complexity: "medium", use_case: "hr" },
  { idea: "When certification exam is passed, then issue digital badge and update HR records", complexity: "medium", use_case: "hr" },
  { idea: "When training feedback is submitted, then analyze ratings and flag low performers", complexity: "medium", use_case: "hr" },
  { idea: "When new course is published, then notify relevant employees and add to catalog", complexity: "simple", use_case: "hr" },
  { idea: "When learning path is completed, then celebrate achievement and suggest career paths", complexity: "medium", use_case: "hr" },
  
  // Equipment & Asset Management
  { idea: "When asset is assigned, then update inventory and log custody chain", complexity: "medium", use_case: "operations" },
  { idea: "When equipment is returned, then inspect condition, update status, and prepare for reuse", complexity: "medium", use_case: "operations" },
  { idea: "When asset tag is scanned, then pull details and display location history", complexity: "simple", use_case: "operations" },
  { idea: "When equipment reaches end of life, then schedule disposal and update asset register", complexity: "complex", use_case: "operations" },
  { idea: "When loaner equipment is overdue, then send reminder and escalate if not returned", complexity: "medium", use_case: "operations" },
  { idea: "When new equipment arrives, then inspect, tag, and add to inventory system", complexity: "medium", use_case: "operations" },
  { idea: "When asset audit is due, then generate checklist and schedule verification", complexity: "complex", use_case: "operations" },
  
  // IT Service Desk
  { idea: "When ticket is submitted, then categorize, prioritize, and assign to appropriate queue", complexity: "complex", use_case: "devops" },
  { idea: "When password reset is requested, then verify identity and process reset", complexity: "simple", use_case: "devops" },
  { idea: "When software install is requested, then check license availability and process", complexity: "medium", use_case: "devops" },
  { idea: "When hardware failure is reported, then dispatch technician or arrange replacement", complexity: "medium", use_case: "devops" },
  { idea: "When VPN access is requested, then verify authorization and provision account", complexity: "medium", use_case: "devops" },
  { idea: "When major incident is declared, then page on-call team and start bridge call", complexity: "complex", use_case: "devops" },
  { idea: "When change request is submitted, then assess risk, schedule window, and notify stakeholders", complexity: "complex", use_case: "devops" },
  
  // Research Analytics
  { idea: "When experiment is started, then log parameters, track progress, and version results", complexity: "complex", use_case: "development" },
  { idea: "When model training completes, then evaluate metrics, compare to baseline, and notify team", complexity: "complex", use_case: "development" },
  { idea: "When dataset is updated, then trigger retraining pipeline and version data", complexity: "complex", use_case: "development" },
  { idea: "When ML model is deployed, then monitor drift and set alerting thresholds", complexity: "complex", use_case: "devops" },
  { idea: "When annotation task is created, then assign to labelers and track quality", complexity: "medium", use_case: "development" },
  { idea: "When benchmark results improve, then document changes and update leaderboard", complexity: "medium", use_case: "development" },
  { idea: "When compute cluster is idle, then scale down to save costs", complexity: "medium", use_case: "devops" },
  
  // Mobile App Operations
  { idea: "When app crash rate increases, then alert development and collect crash logs", complexity: "complex", use_case: "development" },
  { idea: "When app store review is negative, then create support ticket and draft response", complexity: "medium", use_case: "customer service" },
  { idea: "When push notification campaign is scheduled, then verify targeting and send at optimal time", complexity: "medium", use_case: "marketing" },
  { idea: "When feature adoption is low, then trigger onboarding nudge and track improvement", complexity: "medium", use_case: "marketing" },
  { idea: "When app update is released, then monitor error rates and prepare hotfix if needed", complexity: "complex", use_case: "development" },
  { idea: "When deep link is broken, then alert development and fallback to web version", complexity: "medium", use_case: "development" },
  { idea: "When in-app purchase fails, then retry, log error, and offer alternative payment", complexity: "complex", use_case: "finance" },
  
  // API & Platform
  { idea: "When new API key is requested, then generate key, set rate limits, and document usage", complexity: "medium", use_case: "devops" },
  { idea: "When API usage approaches limit, then notify developer and suggest upgrade", complexity: "simple", use_case: "customer service" },
  { idea: "When webhook delivery fails, then retry with backoff and alert if persistent", complexity: "complex", use_case: "devops" },
  { idea: "When API breaking change is planned, then notify developers and provide migration guide", complexity: "complex", use_case: "development" },
  { idea: "When new SDK version is released, then update documentation and notify developers", complexity: "medium", use_case: "development" },
  { idea: "When developer sandbox is requested, then provision environment and send credentials", complexity: "medium", use_case: "devops" },
  { idea: "When API latency exceeds threshold, then investigate root cause and alert operations", complexity: "complex", use_case: "devops" },
  
  // Elearning Platform
  { idea: "When student enrolls in course, then grant access, send materials, and schedule reminders", complexity: "medium", use_case: "customer service" },
  { idea: "When quiz is failed, then recommend review materials and allow retry after cooldown", complexity: "medium", use_case: "customer service" },
  { idea: "When discussion post is flagged, then review for policy violation and take action", complexity: "medium", use_case: "customer service" },
  { idea: "When instructor uploads content, then process video, generate transcript, and publish", complexity: "complex", use_case: "operations" },
  { idea: "When cohort start date approaches, then onboard students and notify instructor", complexity: "medium", use_case: "operations" },
  { idea: "When course completion certificate is earned, then generate PDF and enable LinkedIn share", complexity: "medium", use_case: "customer service" },
  { idea: "When refund request is submitted, then check policy, process refund, and revoke access", complexity: "complex", use_case: "finance" },
  
  // Inventory Planning
  { idea: "When sales forecast is updated, then recalculate safety stock and reorder points", complexity: "complex", use_case: "operations" },
  { idea: "When lead time changes, then adjust procurement schedule and notify planning", complexity: "medium", use_case: "operations" },
  { idea: "When stockout occurs, then create urgent PO and notify affected orders", complexity: "complex", use_case: "operations" },
  { idea: "When excess inventory is identified, then suggest promotions or liquidation", complexity: "complex", use_case: "operations" },
  { idea: "When cycle count shows variance, then investigate cause and adjust records", complexity: "complex", use_case: "operations" },
  { idea: "When seasonal demand starts, then increase forecast and accelerate ordering", complexity: "complex", use_case: "operations" },
  { idea: "When product is discontinued, then run down inventory and remove from catalog", complexity: "complex", use_case: "operations" },
  
  // Call Center Operations
  { idea: "When call queue exceeds threshold, then offer callback option and alert supervisor", complexity: "medium", use_case: "customer service" },
  { idea: "When call is completed, then log disposition, trigger survey, and update CRM", complexity: "complex", use_case: "customer service" },
  { idea: "When agent goes on break, then update status and redistribute queue", complexity: "simple", use_case: "operations" },
  { idea: "When quality score falls below target, then schedule coaching and add training", complexity: "medium", use_case: "hr" },
  { idea: "When customer is on hold too long, then offer callback and apologize for wait", complexity: "simple", use_case: "customer service" },
  { idea: "When escalation is requested, then transfer to supervisor with full context", complexity: "medium", use_case: "customer service" },
  { idea: "When shift ends, then complete wrap-up, transfer pending items, and clock out", complexity: "medium", use_case: "operations" },
  
  // Print Shop Operations
  { idea: "When print order is received, then verify files, calculate pricing, and confirm timeline", complexity: "complex", use_case: "operations" },
  { idea: "When preflight check fails, then notify customer with specific issues and request fix", complexity: "medium", use_case: "customer service" },
  { idea: "When paper stock runs low, then create purchase order and switch to alternative if urgent", complexity: "medium", use_case: "operations" },
  { idea: "When print quality issue is detected, then halt job, notify operator, and assess reprint", complexity: "complex", use_case: "operations" },
  { idea: "When binding is complete, then move to shipping and update customer on tracking", complexity: "medium", use_case: "operations" },
  { idea: "When large format job starts, then allocate machine time and materials", complexity: "medium", use_case: "operations" },
  { idea: "When rush order comes in, then assess capacity, quote premium, and schedule if accepted", complexity: "complex", use_case: "sales" },
  
  // Event Venue Management
  { idea: "When venue inquiry is received, then check availability, prepare quote, and schedule tour", complexity: "medium", use_case: "sales" },
  { idea: "When booking deposit is received, then confirm date, send contract, and block calendar", complexity: "complex", use_case: "sales" },
  { idea: "When event setup is due, then assign crew, prepare materials, and brief team", complexity: "complex", use_case: "operations" },
  { idea: "When AV equipment is requested, then verify inventory, test setup, and train contact", complexity: "medium", use_case: "operations" },
  { idea: "When catering order is confirmed, then coordinate kitchen, schedule delivery, and confirm headcount", complexity: "complex", use_case: "operations" },
  { idea: "When event ends, then clean venue, inventory equipment, and send follow-up survey", complexity: "complex", use_case: "operations" },
  { idea: "When damage report is filed, then assess cost, bill client, and schedule repairs", complexity: "complex", use_case: "finance" },
  
  // Membership Organizations
  { idea: "When membership renewal is due, then send reminder series and process payment", complexity: "medium", use_case: "sales" },
  { idea: "When new member joins, then send welcome kit, add to directory, and invite to orientation", complexity: "complex", use_case: "customer service" },
  { idea: "When member benefits are unused, then send reminder and suggest popular options", complexity: "simple", use_case: "marketing" },
  { idea: "When member complaint is received, then log issue, assign handler, and track resolution", complexity: "medium", use_case: "customer service" },
  { idea: "When member discount is applied, then verify eligibility and log usage", complexity: "simple", use_case: "sales" },
  { idea: "When annual meeting is scheduled, then send notice, collect proxies, and prepare materials", complexity: "complex", use_case: "operations" },
  { idea: "When member passes away, then update records, send condolences, and handle estate matters", complexity: "complex", use_case: "customer service" },
  
  // Brewery & Winery
  { idea: "When fermentation reaches target, then alert cellar team and schedule next step", complexity: "medium", use_case: "operations" },
  { idea: "When batch is ready for bottling, then schedule line, prepare materials, and assign crew", complexity: "complex", use_case: "operations" },
  { idea: "When tasting room reservation is made, then confirm party size and note preferences", complexity: "simple", use_case: "customer service" },
  { idea: "When wine club shipment is due, then select wines, process payments, and schedule fulfillment", complexity: "complex", use_case: "operations" },
  { idea: "When license renewal is approaching, then gather documents and submit application", complexity: "medium", use_case: "legal" },
  { idea: "When ingredient shipment arrives, then verify quality, log lot numbers, and store properly", complexity: "complex", use_case: "operations" },
  { idea: "When harvest date is determined, then schedule picking, coordinate crews, and prep equipment", complexity: "complex", use_case: "operations" },
  
  // Auto Dealership
  { idea: "When vehicle arrives in inventory, then photograph, price, and list on website", complexity: "complex", use_case: "operations" },
  { idea: "When test drive is requested, then verify license, assign salesperson, and prepare vehicle", complexity: "medium", use_case: "sales" },
  { idea: "When financing application is submitted, then run credit, compare lenders, and present options", complexity: "complex", use_case: "finance" },
  { idea: "When trade-in is appraised, then generate offer, document condition, and prepare paperwork", complexity: "complex", use_case: "sales" },
  { idea: "When service appointment is booked, then create repair order and order parts if needed", complexity: "medium", use_case: "customer service" },
  { idea: "When recall is announced, then identify affected vehicles and notify owners", complexity: "complex", use_case: "customer service" },
  { idea: "When sales goal is achieved, then calculate commissions and notify finance", complexity: "complex", use_case: "finance" },
  
  // Bakery Operations
  { idea: "When custom cake order is placed, then confirm details, calculate pricing, and schedule production", complexity: "complex", use_case: "operations" },
  { idea: "When daily bake schedule is finalized, then prep ingredients, assign bakers, and set timers", complexity: "complex", use_case: "operations" },
  { idea: "When product sells out, then update signage, notify staff, and consider increasing tomorrow batch", complexity: "medium", use_case: "operations" },
  { idea: "When wholesale order is received, then verify quantities, schedule production, and arrange delivery", complexity: "complex", use_case: "operations" },
  { idea: "When temperature alarm triggers, then alert manager, check product safety, and document incident", complexity: "complex", use_case: "operations" },
  { idea: "When special diet item is requested, then verify recipe, check for cross-contamination, and label clearly", complexity: "medium", use_case: "customer service" },
  { idea: "When day-old items accumulate, then mark down, donate, or compost per policy", complexity: "simple", use_case: "operations" },
  
  // Florist Operations
  { idea: "When flower delivery is scheduled, then prepare arrangement, assign driver, and notify recipient", complexity: "complex", use_case: "operations" },
  { idea: "When wholesale shipment arrives, then inspect quality, process flowers, and restock coolers", complexity: "complex", use_case: "operations" },
  { idea: "When event floral order is confirmed, then plan arrangements, order supplies, and schedule setup", complexity: "complex", use_case: "operations" },
  { idea: "When subscription renewal is due, then charge card, select arrangement, and schedule delivery", complexity: "complex", use_case: "sales" },
  { idea: "When flower inventory is aging, then mark down for quick sale or use in daily arrangements", complexity: "medium", use_case: "operations" },
  { idea: "When delivery fails, then contact recipient, reschedule, and update customer", complexity: "medium", use_case: "customer service" },
  { idea: "When sympathy order is placed, then prioritize preparation and send condolence card", complexity: "medium", use_case: "customer service" },
  
  // Final batch to reach 1000+
  { idea: "When social media account is compromised, then lock account, alert security, and notify users", complexity: "complex", use_case: "devops" },
  { idea: "When customer survey response is submitted, then categorize feedback and route to relevant team", complexity: "medium", use_case: "customer service" },
  { idea: "When marketing automation email bounces, then clean list and update contact status", complexity: "medium", use_case: "marketing" },
  { idea: "When API documentation is updated, then rebuild site, notify developers, and update changelog", complexity: "medium", use_case: "development" },
  { idea: "When backup verification fails, then alert operations and initiate manual verification", complexity: "complex", use_case: "devops" },
  { idea: "When SaaS subscription invoice is received, then match to budget, route for approval, and process", complexity: "medium", use_case: "finance" },
  { idea: "When employee benefits question is asked, then route to HR and provide self-service links", complexity: "simple", use_case: "hr" },
  { idea: "When product roadmap is updated, then notify stakeholders and update public status page", complexity: "medium", use_case: "development" },
  { idea: "When affiliate commission is earned, then calculate payout and schedule payment", complexity: "complex", use_case: "finance" },
  { idea: "When customer success score drops, then alert CSM and schedule health check call", complexity: "medium", use_case: "customer service" },
  { idea: "When database backup completes, then verify integrity, log success, and clean old backups", complexity: "complex", use_case: "devops" },
  { idea: "When team retrospective is scheduled, then send prep questions and collect feedback ahead", complexity: "medium", use_case: "productivity" },
  { idea: "When integration connection fails, then attempt reconnect, alert user, and log incident", complexity: "complex", use_case: "devops" },
  { idea: "When employee submits expense mileage, then calculate reimbursement and add to report", complexity: "medium", use_case: "finance" },
  { idea: "When marketing landing page goes live, then test all CTAs, verify tracking, and alert team", complexity: "complex", use_case: "marketing" },
  { idea: "When customer account is merged, then combine data, preserve history, and notify account owner", complexity: "complex", use_case: "operations" },
  { idea: "When feature request is upvoted significantly, then escalate to product and notify voters", complexity: "medium", use_case: "development" },
  { idea: "When contract counter-proposal is received, then track changes, notify legal, and update status", complexity: "medium", use_case: "legal" },
  { idea: "When subscription payment is successful, then extend access, send receipt, and thank customer", complexity: "medium", use_case: "finance" },
  { idea: "When customer requests data export, then generate file, verify contents, and send secure link", complexity: "complex", use_case: "customer service" },
];

async function main() {
  console.log('Reading existing workflow ideas...');
  
  const jsonPath = '/Users/devagarwal/Documents/openclaw-projects/10000_workflow_automation_ideas.json';
  const uniqueIdeas = extractUniqueIdeas(jsonPath);
  
  console.log(`Found ${uniqueIdeas.size} unique ideas from 10k JSON file`);
  
  // Convert to array and select best 500 (first 500 unique)
  const curatedIdeas = Array.from(uniqueIdeas.values()).slice(0, 500);
  console.log(`Selected ${curatedIdeas.length} curated ideas`);
  
  // Prepare all workflows
  const workflows: Array<{
    idea: string;
    complexity: string;
    use_case: string;
    platforms: string[];
    votes: number;
    category_id: string;
  }> = [];
  
  // Add curated ideas from existing JSON
  for (const idea of curatedIdeas) {
    workflows.push({
      idea: idea.idea,
      complexity: idea.complexity,
      use_case: idea.use_case,
      platforms: idea.platforms,
      votes: 0,
      category_id: getCategoryId(idea.idea)
    });
  }
  
  console.log(`Adding ${newIdeas.length} new unique ideas...`);
  
  // Add new ideas
  for (const idea of newIdeas) {
    workflows.push({
      idea: idea.idea,
      complexity: idea.complexity,
      use_case: idea.use_case,
      platforms: getRandomPlatforms(),
      votes: 0,
      category_id: getCategoryId(idea.idea)
    });
  }
  
  // Ensure uniqueness by idea text
  const seenIdeas = new Set<string>();
  const uniqueWorkflows = workflows.filter(w => {
    const normalized = w.idea.toLowerCase().trim();
    if (seenIdeas.has(normalized)) {
      return false;
    }
    seenIdeas.add(normalized);
    return true;
  });
  
  console.log(`Total unique workflows: ${uniqueWorkflows.length}`);
  
  // Take exactly 1000
  const finalWorkflows = uniqueWorkflows.slice(0, 1000);
  
  // Write to workflows.json
  const outputPath = '/Users/devagarwal/Documents/openclaw-projects/workflowsai/my-app/workflows.json';
  const output = {
    workflows: finalWorkflows
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Written ${finalWorkflows.length} workflows to ${outputPath}`);
  
  // Print category distribution
  const categoryCount: Record<string, number> = {};
  for (const w of finalWorkflows) {
    categoryCount[w.category_id] = (categoryCount[w.category_id] || 0) + 1;
  }
  console.log('\nCategory distribution:');
  for (const [cat, count] of Object.entries(categoryCount).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }
}

main().catch(console.error);
