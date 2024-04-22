import React from "react";


const MessageSkeleton:React.FC = () => {

	return (
		<>
			<div className="p-2 max-w-sm w-full ">
				<div className="animate-pulse flex space-x-4 items-end">
					<div className="rounded-full bg-slate-400 h-12 w-12"></div>
					<div className="flex-1 space-y-4 py-0 ">
						<div className="h-4 bg-slate-400 rounded"></div>
						<div className="space-y-2">
							<div className="h-2 bg-slate-400 rounded"></div>
							<div className="h-2 bg-slate-400 rounded"></div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className="p-2 max-w-sm w-full justify-end">
					<div className="animate-pulse flex space-x-4 items-end">
						<div className="flex-1 space-y-4 py-0 ">
							<div className="h-4 bg-slate-400 rounded"></div>
							<div className="space-y-2">
								<div className="h-2 bg-slate-400 rounded"></div>
							</div>
						</div>
						<div className="rounded-full bg-slate-400 h-12 w-12"></div>
					</div>
				</div>
			</div>

		</>
	);
};
export default MessageSkeleton;