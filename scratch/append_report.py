import os

with open('src/routes/dashboard/admin/mixpanel.tsx', 'r') as f:
    content = f.read()

# Add imports at the top
imports = """
import { CaretLeft, CaretRight, CheckCircle, Clock, Download, Eye, ReadCvLogo, Robot, Stack, Timer, Warning, XCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
"""
content = content.replace('import { api } from "@/utils/api";', 'import { api } from "@/utils/api";' + imports)

# Update TabId type
content = content.replace('type TabId = "overview" | "activity" | "ai" | "search" | "journey";', 'type TabId = "overview" | "activity" | "ai" | "search" | "journey" | "detailed";')

# Update tabs array
content = content.replace('{ id: "journey", label: "User Journey" },', '{ id: "journey", label: "User Journey" },\n    { id: "detailed", label: "Detailed Activity Report" },')

# Render the tab
content = content.replace('{tab === "journey" && <JourneyTab data={data} />}', '{tab === "journey" && <JourneyTab data={data} />}\n          {tab === "detailed" && <DetailedActivityReportTab />}')

# Extract logic from scratch/detailed-report.tsx
with open('scratch/detailed-report.tsx', 'r') as f:
    detailed_report = f.read()

# Wrap it in DetailedActivityReportTab function
component = f"""
function DetailedActivityReportTab() {{
	const [page, setPage] = useState(1);
	const limit = 10;
	const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);

	const {{ data: userAnalytics, isLoading }} = useQuery({{
		queryKey: ["user-analytics", page, limit],
		queryFn: () => api.fetchUserAnalytics(page, limit),
	}});

	const users = userAnalytics?.users || [];
	const pagination = userAnalytics?.pagination;

	return (
{detailed_report}
	);
}}
"""

# Append component to file
with open('src/routes/dashboard/admin/mixpanel.tsx', 'w') as f:
    f.write(content + "\n" + component)
