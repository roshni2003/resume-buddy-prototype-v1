import { DribbbleLogo, GithubLogo, Globe, LinkedinLogo, PlusIcon, TwitterLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { useResumeStore } from "@/components/resume/store/resume";
import { Input } from "@/components/ui/input";
import { DragHandle, SortableItem } from "@/components/ui/sortable-item";
import { SortableList } from "@/components/ui/sortable-list";
import { cn } from "@/utils/style";
import { SectionBase } from "../shared/section-base";

type ProfileFormData = {
	network: string;
	username: string;
	url: string;
};

type SocialNetwork = {
	name: string;
	icon: string;
	iconNode: React.ReactNode;
	iconColor: string;
	borderColor: string;
	placeholder: string;
};

const socialNetworks: SocialNetwork[] = [
	{
		name: "LinkedIn",
		icon: "LinkedinLogo",
		iconNode: <LinkedinLogo weight="regular" className="h-4 w-4" />,
		iconColor: "text-[#0077b5]",
		borderColor: "border-[#0077b5]/30",
		placeholder: "linkedin.com/in/username",
	},
	{
		name: "GitHub",
		icon: "GithubLogo",
		iconNode: <GithubLogo weight="regular" className="h-4 w-4" />,
		iconColor: "text-gray-800",
		borderColor: "border-gray-300",
		placeholder: "github.com/username",
	},
	{
		name: "Twitter",
		icon: "TwitterLogo",
		iconNode: <TwitterLogo weight="regular" className="h-4 w-4" />,
		iconColor: "text-[#1da1f2]",
		borderColor: "border-[#1da1f2]/30",
		placeholder: "twitter.com/username",
	},
	{
		name: "Dribbble",
		icon: "DribbbleLogo",
		iconNode: <DribbbleLogo weight="regular" className="h-4 w-4" />,
		iconColor: "text-[#ea4c89]",
		borderColor: "border-[#ea4c89]/30",
		placeholder: "dribbble.com/username",
	},
	{
		name: "Portfolio",
		icon: "Globe",
		iconNode: <Globe weight="regular" className="h-4 w-4" />,
		iconColor: "text-emerald-600",
		borderColor: "border-emerald-200",
		placeholder: "yourwebsite.com",
	},
];

const detectNetworkFromUrl = (url: string) => {
	try {
		// Clean the URL - remove any extra spaces
		let cleanUrl = url.trim();

		// Add protocol if missing for URL parsing
		if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
			cleanUrl = "https://" + cleanUrl;
		}

		const urlObj = new URL(cleanUrl);
		const hostname = urlObj.hostname.toLowerCase();

		// Remove www. prefix for better matching
		const domain = hostname.replace(/^www\./, "");

		let network = "Portfolio";
		let username = "";

		if (domain.includes("linkedin.com")) {
			network = "LinkedIn";
			// Extract username from LinkedIn URL (e.g., /in/username)
			const pathParts = urlObj.pathname.split("/").filter(Boolean);
			if (pathParts.includes("in") && pathParts.length > 1) {
				username = pathParts[pathParts.indexOf("in") + 1] || "";
			} else {
				username = pathParts.pop() || "";
			}
		} else if (domain.includes("github.com")) {
			network = "GitHub";
			username = urlObj.pathname.split("/").filter(Boolean)[0] || "";
		} else if (domain.includes("twitter.com") || domain.includes("x.com")) {
			network = "Twitter";
			username = urlObj.pathname.split("/").filter(Boolean)[0] || "";
		} else if (domain.includes("dribbble.com")) {
			network = "Dribbble";
			username = urlObj.pathname.split("/").filter(Boolean)[0] || "";
		} else {
			// For portfolio/other websites, try to extract a username from common patterns
			// Extract network name from domain (e.g., instagram.com -> Instagram)
			const domainName = domain.split(".")[0];
			if (domainName && domainName !== "www") {
				network = domainName.charAt(0).toUpperCase() + domainName.slice(1);
			} else {
				network = "Website";
			}

			// Common patterns for portfolio URLs
			const pathParts = urlObj.pathname.split("/").filter(Boolean);

			// Check for patterns like /u/username, /user/username, /profile/username
			if (pathParts.includes("u") && pathParts.length > 1) {
				username = pathParts[pathParts.indexOf("u") + 1] || "";
			} else if (pathParts.includes("user") && pathParts.length > 1) {
				username = pathParts[pathParts.indexOf("user") + 1] || "";
			} else if (pathParts.includes("profile") && pathParts.length > 1) {
				username = pathParts[pathParts.indexOf("profile") + 1] || "";
			} else if (pathParts.length > 0) {
				// If no common pattern, use the first path segment or the domain
				username = pathParts[0] || domain;
			} else {
				username = domain;
			}
		}

		// Clean up username (remove trailing slashes, query params, etc.)
		username = username.split("?")[0].split("#")[0];

		return { network, username: username || domain, url: cleanUrl };
	} catch (error) {
		// If URL parsing fails, return as portfolio with the original string
		return { network: "Portfolio", username: url, url: url };
	}
};

export function ProfilesSectionBuilder() {
	const section = useResumeStore((state) => state.resume.data.sections.profiles);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	const [isAddingProfile, setIsAddingProfile] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState<ProfileFormData>({
		network: "LinkedIn",
		username: "",
		url: "",
	});

	const handleAddProfile = () => {
		if (formData.username.trim()) {
			const networkData = socialNetworks.find((n) => n.name === formData.network);
			const newProfile = {
				id: crypto.randomUUID(),
				hidden: false,
				icon: networkData?.icon || "🔗",
				network: formData.network,
				username: formData.username,
				website: {
					url: formData.url || `https://${networkData?.placeholder}`,
					label: formData.username,
				},
			};

			updateResumeData((draft) => {
				draft.sections.profiles.items.push(newProfile);
			});

			setFormData({ network: "LinkedIn", username: "", url: "" });
			setIsAddingProfile(false);
		} else {
			alert("Please enter a username before adding a profile.");
		}
	};

	const handleUpdateProfile = () => {
		updateResumeData((draft) => {
			const item = draft.sections.profiles.items.find((p) => p.id === editingId);
			if (item) {
				item.network = formData.network;
				item.username = formData.username;
				item.website.url = formData.url;
			}
		});
		setEditingId(null);
		setFormData({ network: "LinkedIn", username: "", url: "" });
	};

	const handleDeleteProfile = (id: string) => {
		updateResumeData((draft) => {
			draft.sections.profiles.items = draft.sections.profiles.items.filter((item) => item.id !== id);
		});
	};

	const handleReorder = (items: typeof section.items) => {
		updateResumeData((draft) => {
			draft.sections.profiles.items = items;
		});
	};

	const startEditing = (profile: {
		id: string;
		network: string;
		username: string;
		website: { url: string; label: string };
	}) => {
		setEditingId(profile.id);
		setFormData({
			network: profile.network,
			username: profile.username,
			url: profile.website.url,
		});
		setIsAddingProfile(false);
	};

	const cancelForm = () => {
		setIsAddingProfile(false);
		setEditingId(null);
		setFormData({ network: "LinkedIn", username: "", url: "" });
	};

	const getNetworkIcon = (network: string) => {
		const networkData = socialNetworks.find((n) => n.name === network);
		return networkData?.iconNode || <Globe weight="regular" className="h-4 w-4" />;
	};

	const getNetworkColor = (network: string) => {
		const networkData = socialNetworks.find((n) => n.name === network);
		return networkData
			? `${networkData.iconColor} bg-white border ${networkData.borderColor}`
			: "text-gray-500 bg-white border border-gray-200";
	};

	return (
		<SectionBase type="profiles">
			<div className="space-y-4">
				{/* Section Card */}
				<div
					className={cn(
						"overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-colors",
						section.items.length === 0 && !isAddingProfile ? "border-gray-300 border-dashed" : "border-gray-200",
					)}
				>
					{/* Profiles List */}
					<SortableList
						items={section.items}
						onReorder={handleReorder}
						keyExtractor={(item) => item.id}
						renderItem={(profile) => (
							<SortableItem key={profile.id} id={profile.id} className="group border-gray-200 border-b last:border-b-0">
								<div className="flex items-center gap-4 p-4 transition-all hover:bg-gray-50">
									<DragHandle className="shrink-0 p-1 text-gray-400 transition-colors hover:text-gray-600" />
									<div
										className={cn(
											"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
											getNetworkColor(profile.network),
										)}
									>
										{getNetworkIcon(profile.network)}
									</div>
									<div className="min-w-0 flex-1">
										<h4 className="font-semibold text-gray-900 text-sm">{profile.network}</h4>
										<p className="truncate text-gray-600 text-sm">{profile.username}</p>
									</div>
									<div className="flex shrink-0 items-center gap-2">
										<button
											onClick={() => startEditing(profile)}
											className="rounded-lg p-2 text-gray-600 transition-all hover:bg-emerald-50 hover:text-emerald-600"
											title="Edit"
											type="button"
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												/>
											</svg>
										</button>
										<button
											onClick={() => handleDeleteProfile(profile.id)}
											className="rounded-lg p-2 text-gray-600 transition-all hover:bg-red-50 hover:text-red-600"
											title="Delete"
											type="button"
										>
											<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								</div>
							</SortableItem>
						)}
					/>

					{/* Add/Edit Form */}
					{(isAddingProfile || editingId) && (
						<div className="border-gray-200 border-t bg-white p-6">
							<div className="mb-4 flex items-center justify-between">
								<h4 className="font-semibold text-gray-900 text-sm">
									{editingId ? "Edit Profile" : "Add New Profile"}
								</h4>
							</div>

							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{/* Network Selection */}
									<div className="space-y-1.5">
										<label className="font-bold text-gray-500 text-xs uppercase tracking-wider">Network</label>
										<Input
											type="text"
											list="network-options"
											value={formData.network}
											onChange={(e) => setFormData({ ...formData, network: e.target.value })}
											placeholder="e.g. LinkedIn, Instagram"
										/>
										<datalist id="network-options">
											{socialNetworks.map((network) => (
												<option key={network.name} value={network.name} />
											))}
										</datalist>
									</div>

									{/* Username */}
									<div className="space-y-1.5">
										<label className="font-bold text-gray-500 text-xs uppercase tracking-wider">Username</label>
										<Input
											type="text"
											value={formData.username}
											onChange={(e) => setFormData({ ...formData, username: e.target.value })}
											placeholder="johndoe"
										/>
									</div>
								</div>

								{/* URL */}
								<div className="space-y-1.5">
									<label className="font-bold text-gray-500 text-xs uppercase tracking-wider">Profile URL</label>
									<Input
										type="url"
										value={formData.url}
										onChange={(e) => setFormData({ ...formData, url: e.target.value })}
										placeholder={socialNetworks.find((n) => n.name === formData.network)?.placeholder}
									/>
								</div>

								{/* Form Actions */}
								<div className="flex items-center gap-3 pt-2">
									<button
										onClick={editingId ? handleUpdateProfile : handleAddProfile}
										className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#0f1c23] font-medium text-sm text-white transition-all hover:bg-gray-800"
										type="button"
									>
										{editingId ? "Save Changes" : "Add Profile"}
									</button>
									<button
										onClick={cancelForm}
										className="flex h-10 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 font-medium text-gray-700 text-sm transition-all hover:bg-gray-50"
										type="button"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Add Network Default View */}
					{!isAddingProfile && !editingId && (
						<div className="flex flex-col gap-4 p-5">
							<div className="flex items-center gap-2 font-bold text-gray-500 text-xs uppercase tracking-widest">
								<span>&bull;</span> ADD A NETWORK
							</div>

							<div className="flex flex-wrap gap-3">
								{socialNetworks.map((network) => (
									<button
										key={network.name}
										onClick={() => {
											setFormData({ ...formData, network: network.name });
											setIsAddingProfile(true);
										}}
										className={cn(
											"flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-sm transition-colors hover:bg-gray-50",
											network.borderColor,
										)}
										type="button"
									>
										<span className={network.iconColor}>{network.iconNode}</span>
										<span className="text-gray-900">{network.name}</span>
										<PlusIcon className="h-4 w-4 text-gray-500" weight="bold" />
									</button>
								))}
							</div>

							<div className="relative mt-2">
								<input
									type="text"
									placeholder="Or paste any URL — we'll detect the network."
									onChange={(e) => {
										const val = e.target.value;
										if (val.trim()) {
											const detected = detectNetworkFromUrl(val.trim());
											setFormData({
												network: detected.network,
												username: detected.username,
												url: detected.url,
											});
											setIsAddingProfile(true);
										}
									}}
									className="flex w-full items-center justify-center rounded-[20px] border-2 border-cyan-200 border-dashed p-4 text-center font-medium text-gray-600 text-sm transition-all placeholder:text-gray-600 hover:bg-gray-50 focus:border-cyan-400 focus:text-left focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:placeholder:text-gray-400"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</SectionBase>
	);
}
