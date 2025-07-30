"use client";

import { contents } from "@/data/sidebar-items";
import { Menu } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	createContext,
	Fragment,
	useContext,
	useState,
	useEffect,
} from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export type NavMobileContextState = {
	isOpen: boolean;
	toggleNavbar: () => void;
	isDocsOpen: boolean;
	toggleDocsNavbar: () => void;
};

const NavContext = createContext<NavMobileContextState | undefined>(undefined);

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDocsOpen, setIsDocsOpen] = useState(false);

	const toggleNavbar = () => {
		setIsOpen((prev) => !prev);
	};

	const toggleDocsNavbar = () => {
		setIsDocsOpen((prev) => !prev);
	};

	return (
		<NavContext.Provider
			value={{
				isOpen,
				isDocsOpen,
				toggleNavbar,
				toggleDocsNavbar,
			}}
		>
			{children}
		</NavContext.Provider>
	);
};

export const useNavMobile = (): NavMobileContextState => {
	const ctx = useContext(NavContext);
	if (!ctx) {
		throw new Error("useNavMobile must be used within a NavProvider");
	}
	return ctx;
};

export const NavMobileButton: React.FC = () => {
	const { toggleNavbar } = useNavMobile();
	return (
		<div className="flex items-center">
			<button
				onClick={toggleNavbar}
				className="text-muted-foreground overflow-hidden px-2.5 block md:hidden cursor-pointer"
			>
				<Menu />
				<span className="sr-only">Toggle menu</span>
			</button>
		</div>
	);
};

export const NavMobile = () => {
	const { isOpen, toggleNavbar } = useNavMobile();
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="fixed top-(--nav-height) left-0 px-4 mx-auto w-full h-auto md:hidden transform-gpu z-[100] bg-background [border:1px_solid_rgba(255,255,255,.1)]">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{
							once: true,
							margin: "0px 0px -200px",
						}}
						transition={{ staggerChildren: 0.2 }}
						variants={{
							hidden: {
								opacity: 0,
								y: shouldReduceMotion ? 0 : -24,
							},
							visible: {
								opacity: 1,
								y: 0,
							},
						}}
						className="z-50"
					>
						{navMenu.map((menu) => (
							<Fragment key={menu.name}>
								{menu.child ? (
									<></>
								) : (
									<Link
										href={menu.path}
										className="block py-4 text-lg"
										onClick={toggleNavbar}
									>
										{menu.name}
									</Link>
								)}
							</Fragment>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

type NavMenuItem = {
	name: string;
	path: string;
	child?: {
		name: string;
		path: string;
	}[];
};

export const navMenu: NavMenuItem[] = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Documentation",
		path: "/docs",
	},
];

export const DocsNavMobileButton: React.FC = () => {
	const { toggleDocsNavbar } = useNavMobile();

	return (
		<button
			className="block ml-auto text-muted-foreground md:hidden"
			onClick={toggleDocsNavbar}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1.4em"
				height="1.4em"
				viewBox="0 0 24 24"
			>
				<path
					className="fill-foreground"
					fillRule="evenodd"
					d="M2.25 6A.75.75 0 0 1 3 5.25h18a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6m0 4A.75.75 0 0 1 3 9.25h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75"
					clipRule="evenodd"
					opacity=".5"
				></path>
				<path
					fill="currentColor"
					d="M13.43 14.512a.75.75 0 0 1 1.058-.081l3.012 2.581l3.012-2.581a.75.75 0 1 1 .976 1.139l-3.5 3a.75.75 0 0 1-.976 0l-3.5-3a.75.75 0 0 1-.081-1.058"
				></path>
			</svg>
		</button>
	);
};

export const DocsNavBarMobile = () => {
	const { isDocsOpen: isOpen, toggleDocsNavbar: toggleNavbar } = useNavMobile();
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();
	const content = pathname.startsWith("/docs/examples") ? [] : contents;

	useEffect(() => {
		const body = document.body || document.documentElement;
		const prev = body.style.overflow;
		if (isOpen) {
			body.style.overflow = "hidden";
		} else {
			body.style.overflow = prev;
		}

		return () => {
			body.style.overflow = prev;
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{
						once: true,
						margin: "0px 0px -200px",
					}}
					transition={{ staggerChildren: 0.2 }}
					variants={{
						hidden: {
							opacity: 0,
							y: shouldReduceMotion ? 0 : -24,
						},
						visible: {
							opacity: 1,
							y: 0,
						},
					}}
					className="fixed inset-x-0 top-[calc(var(--fd-nav-height)+1px)] bg-background supports-backdrop-filter:backdrop-blur-lg supports-backdrop-filter:bg-background/80 h-[calc(100dvh-var(--fd-nav-height)-1px)] w-full z-[1000] p-5 divide-y overflow-y-auto"
				>
					<Accordion type="single" collapsible>
						{content.map((menu, i) => (
							<AccordionItem key={menu.title} value={menu.title}>
								<AccordionTrigger className="font-normal text-foreground">
									<div className="flex items-center gap-2">
										{!!menu.Icon && <menu.Icon className="size-5" />}
										{menu.title}
									</div>
								</AccordionTrigger>
								<AccordionContent className="pl-5 divide-y">
									{menu.list.map((child, j) => (
										<Fragment key={child.title}>
											{child.group ? (
												<p className="text-sm py-2">{child.title}</p>
											) : (
												<Link
													href={child.href}
													className="block py-2 text-sm border-b first:pt-0 last:pb-0 last:border-0 text-muted-foreground"
													onClick={toggleNavbar}
												>
													<div className="flex items-center gap-2">
														{!!child.Icon && <child.Icon className="size-4" />}
														{child.title}
													</div>
												</Link>
											)}
										</Fragment>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const DocsNavBarMobileTitle = () => {
	const pathname = usePathname();

	return pathname.startsWith("/docs/examples") ? <p>Examples</p> : <p>Docs</p>;
};
