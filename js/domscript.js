
function CleanRedditDOM()
{
	console.log("Cleaning DOM...");

	// Hide upvote/downvote/votes div

	let upvoteButtons = document.querySelectorAll("[data-click-id='upvote'");

	for (let i = 0; i < upvoteButtons.length; i++)
	{
		upvoteButtons[i].parentElement.style.display = "none";
	}

	// Hide points for comments - note that this also hides other spans in the comment header

	let headerSpans = document.querySelectorAll("div[class*='Comment'] > div > div > span");

	for (let i = 0; i < headerSpans.length; i++)
	{
		headerSpans[i].style.display = "none";
	}

	// Hide sidebar ads

	let sideBarAdDivs = document.querySelectorAll("div[data-before-content='advertisement']");

	for (let i = 0; i < sideBarAdDivs.length; i++)
	{
		sideBarAdDivs[i].style.display = "none";
	}

	// Hide ads between posts

	let postAds = document.querySelectorAll("div[class*='promotedlink']");

	for (let i = 0; i < postAds.length; i++)
	{
		postAds[i].style.display = "none";
	}

	let responseObject = {
		voteDivs: upvoteButtons.length,
		sideBarAds: sideBarAdDivs.length,
		postAds: postAds.length
	};

	// No purpose just to demonstrate how a website can communicate with an extension
	chrome.runtime.sendMessage(extensionid, { feedback: responseObject }, function(response) {
		console.log("Extension response", response);
	});
}

CleanRedditDOM();

let observer = new MutationObserver(function(mutationsList, observer) {
	CleanRedditDOM();
});

// Start observing mutations in the DOM, so we can clean the updated DOM
observer.observe(document.body, { attributes: false, childList: true, subtree: true });