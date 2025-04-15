import { useState } from "react";
import { ChevronsUpDown, User, Crown, Fingerprint, LogIn, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function AuthenticateView(props) {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(-1);
	const [password, setPassword] = useState("");
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);

	function autoCompleteHelperACB(event) {
		const username = event.target.value;
		const index = props.users.findIndex((u) => u.username === username);
		setUser(index);
	}

	function onSignInACB() {
		if (user === -1 || password === "") {
			setAlertDialogOpen(true);
			return false;
		}
		props.signIn(props.users[user].username, password)
	}

	return (
		<div className="m-5 flex flex-col items-center justify-center align-center h-full text-center gap-5 px-12">
			<div className="flex flex-col items-center justify-center gap-3">
				<Fingerprint className="size-25" />
				<h2 className="text-4xl font-medium">WakeWise Authentication</h2>
			</div>
			<p>Sign in with your user account in order to access this alarm clock.</p>

			<form className="mt-10 w-full flex flex-col items-center justify-center gap-3 text-center">
				<Label className="text-left">
					<span className="font-bold">Clock:</span> {props.clockName}
				</Label>

				{/* Combobox code derived from https://ui.shadcn.com/docs/components/combobox and modified to needs */}
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between" id="userSelector">
							<div className="flex flex-row items-center">
								{props.users[user] && props.users[user].isAdmin ? <Crown className={"mr-1"} /> : <User className={"mr-1"} />}
								{props.users[user] ? props.users[user].username : "Select user"}
							</div>
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
						<Command defaultValue={"-"}>
							<CommandList>
								<CommandGroup>
									{props.users.map((user, index) => (
										<CommandItem
											key={user.username}
											onSelect={() => {
												setUser(index);
												setOpen(false);
											}}
											className="active:scale-99"
										>
											{user.isAdmin ? <Crown className={"mr-2 h-4 w-4"} /> : <User className={"mr-2 h-4 w-4"} />}
											{user.username}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				<input className="fixed" type="text" name="username" autoComplete="username" value={props.users[user]?.username ?? ""} onChange={autoCompleteHelperACB} style={{ height: 0 }} />

				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					autoComplete="current-password"
				/>

				<div className="flex flex-row gap-2 w-full">
					<Button type="button" variant="outline" className="flex-1 active:scale-95" onClick={onSignInACB}>
						<LogIn /> Sign in
					</Button>
					<Button type="button" variant="outline" className="flex-1 active:scale-95 bg-secondary" onClick={() => props.showHelp()}>
						<CircleHelp /> Help
					</Button>
				</div>
			</form>

			{/* AlertDialog code derived from https://ui.shadcn.com/docs/components/alert-dialog and modified to needs */}
			<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Missing user or password</AlertDialogTitle>
						<AlertDialogDescription>
							Please check that you have selected a user from the dropdown menu and that you have entered the correct password.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction>OK</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default AuthenticateView;
