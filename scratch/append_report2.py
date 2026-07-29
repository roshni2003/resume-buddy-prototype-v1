import os

with open('src/routes/dashboard/admin/analytics.tsx', 'r') as f:
    analytics = f.readlines()

# Extract parts (0-indexed)
# Table JSX: 657 to 803 -> 656 to 803
table_jsx = "".join(analytics[656:803])
# AIInvocationsDetail: 808 to 940 -> 807 to 940
ai_detail = "".join(analytics[807:940])
# InvocationItem: 942 to 1070 -> 941:1070
inv_item = "".join(analytics[941:1070])

# Prepare the new code to append
append_code = f"""
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
{table_jsx}
	);
}}

{ai_detail}

{inv_item}
"""

with open('src/routes/dashboard/admin/mixpanel.tsx', 'r') as f:
    content = f.read()

# Replace TabId
content = content.replace('type TabId = "overview" | "activity" | "ai" | "search" | "journey";', 'type TabId = "overview" | "activity" | "ai" | "search" | "journey" | "detailed";')

# Replace Tabs array
content = content.replace('{ id: "journey", label: "User Journey" },', '{ id: "journey", label: "User Journey" },\n    { id: "detailed", label: "Detailed Activity Report" },')

# Render tab
content = content.replace('{tab === "journey" && <JourneyTab data={data} />}', '{tab === "journey" && <JourneyTab data={data} />}\n          {tab === "detailed" && <DetailedActivityReportTab />}')

# Add imports
imports = """
import { CaretLeft, CaretRight, CheckCircle, Clock, Download, Eye, ReadCvLogo, Robot, Stack, Timer, Warning, XCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
"""
content = content.replace('import { api } from "@/utils/api";', 'import { api } from "@/utils/api";\n' + imports)

with open('src/routes/dashboard/admin/mixpanel.tsx', 'w') as f:
    f.write(content + "\n" + append_code)

