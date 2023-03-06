<!-- component -->
<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 shadow-lg">
	<div class="text-center">
		<h2 class="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
		<p class="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
	</div>
	<form class="mt-8 space-y-3" method="POST">
		<div class="grid grid-cols-1 space-y-2">
			<label class="text-sm font-bold text-gray-500 tracking-wide"
				>Title
				<input
					class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
					type="text"
					name="title"
					placeholder="Document title"
				/>
			</label>
		</div>
		<div class="grid grid-cols-1 space-y-2">
			<label class="text-sm font-bold text-gray-500 tracking-wide"
				>Attach Document
				<div class="flex items-center justify-center w-full">
					<label
						class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center"
					>
						<div class="h-full w-full text-center flex flex-col items-center justify-center">
							-<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-10 h-10 text-blue-400 group-hover:text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<p class="pointer-none text-gray-500 ">
								<span class="text-sm">Drag and drop</span> file here <br /> or
								<label>
									<input class="text-blue-600 hover:underline" type="file" style="display: none;" />
									select a file
								</label>
								from your computer
							</p>
						</div>
						<input type="file" name="file" class="hidden" accept=".txt,.md,.pdf" />
					</label>
				</div>
			</label>
		</div>
		<p class="text-sm text-gray-300">
			<span>File type: txt, md, pdf</span>
		</p>
		<div>
			<button
				type="submit"
				class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
			>
				Upload
			</button>
		</div>
	</form>
</div>
