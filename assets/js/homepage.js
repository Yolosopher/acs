const minimizer = document.querySelector('.fixedsmallinfowindow__minimize')
const fixedInfoWindow = document.querySelector('.fixedsmallinfowindow')
const fixedlargeinfowindow = document.querySelector('.fixedlargeinfowindow')

minimizer.addEventListener('click', () => {
	fixedInfoWindow.classList.toggle('toggled')
})

// START fixedsmallinfowindow inside elements
const elementbox = document.querySelector('.fixedsmallinfowindow__elementbox')

const elementboxID = document.getElementById('elementboxID')

const elementboxSymbol = document.querySelector(
	'.fixedsmallinfowindow__elementbox .symbol'
)

const elementboxName = document.querySelector(
	'.fixedsmallinfowindow__elementbox .name'
)

const elementboxMass = document.querySelector(
	'.fixedsmallinfowindow__elementbox .mass'
)

const infowindowH1 = document.querySelector('.fixedsmallinfowindow h1')

const infowindowmass = document.querySelector(
	'.fixedsmallinfowindow__midgrid__item__massvalue'
)

const infowindowyear = document.querySelector(
	'.fixedsmallinfowindow__midgrid__item__year'
)

const infowindowYTlink = document.getElementById('infowindowYOUTUBElink')
// END fixedsmallinfowindow inside elements

const infoWindowOpener = (closer = false) => {
	if (closer) {
		fixedInfoWindow.classList.remove('toggled')
	} else {
		fixedInfoWindow.classList.add('toggled')
	}
}

const cells = document.querySelectorAll(
	'.periodic__content__row__cell[data-id]'
)

elements.forEach((el) => {
	let cell =
		document.querySelector(`[data-id='${el.id}']`) &&
		document.querySelector(`[data-id='${el.id}']`)

	if (cell && el.links[0]) {
		let utubelink = document.createElement('a')
		cell.appendChild(utubelink)
		let outerhtml = `
            <a href="${el.links[0]}" target="_blank" class="utubelink"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g transform="translate(-545 -861)"><rect width="22" height="22" transform="translate(545 861)" fill="rgba(255,255,255,0)"/><path d="M18.094,9,8.725,3.46a3.231,3.231,0,0,0-3.333.009A3.443,3.443,0,0,0,3.75,6.46V17.58A3.37,3.37,0,0,0,7.067,21a3.25,3.25,0,0,0,1.658-.46L18.094,15a3.474,3.474,0,0,0,0-5.92Zm-.97,4.19L7.756,18.81a1.36,1.36,0,0,1-1.377,0,1.429,1.429,0,0,1-.689-1.23V6.42A1.391,1.391,0,0,1,7.067,5a1.459,1.459,0,0,1,.689.19l9.369,5.58a1.442,1.442,0,0,1,0,2.46Z" transform="translate(544.25 859.998)" fill="#aa0c1c"/></g></svg></a>
        `
		utubelink.outerHTML = outerhtml
	}
})

cells.forEach((cell) => {
	cell.addEventListener('click', () => {
		let elementboxIDval = +cell.querySelector('.number').innerText
		let elementboxSymbolText = cell.querySelector('.symbol').innerText
		let elementboxNameText = cell.querySelector('.name').innerText
		let infowindowmassText = cell.querySelector('.mass').innerText
		let year = cell.dataset.year
		let color = cell.dataset.color
		let link = false
		link =
			cell.querySelector('.utubelink') &&
			cell.querySelector('.utubelink').href

		if (cell.classList.contains('shown')) {
			cell.classList.remove('shown')
		} else {
			cells.forEach((each) => each.classList.remove('shown'))

			// START change infowindow content
			elementboxID.value = elementboxIDval
			elementboxSymbol.innerText = elementboxSymbolText
			elementboxName.innerText = elementboxNameText
			infowindowH1.innerText = elementboxNameText
			elementboxMass.innerText = infowindowmassText
			infowindowmass.innerText = infowindowmassText
			infowindowyear.innerText = year
			elementbox.style.backgroundColor = color
			if (link) {
				infowindowYTlink.href = link
				infowindowYTlink.classList.remove('disabled')
			} else {
				infowindowYTlink.classList.add('disabled')
			}
			
			let filtered = elements.filter(el => el.id === elementboxIDval)
			console.log(filtered)
			if (filtered[0]) {
				document.querySelector('.fixedsmallinfowindow__submitbtn').classList.remove('hidden')
			} else {
				document.querySelector('.fixedsmallinfowindow__submitbtn').classList.add('hidden')
			}
			// END change infowindow content

			cell.classList.add('shown')
			fixedInfoWindow.classList.add('toggled')
		}
	})
})

const largeInfoWindowClose = document.getElementById('largeInfoWindowClose')

largeInfoWindowClose.addEventListener('click', () => {
	fixedlargeinfowindow.classList.remove('shown')
    let iframes = largeInfoWindowYtLinks.querySelectorAll('iframe')
    if (iframes[0]) {
        iframes.forEach(each => each.remove())
    }
})



const moreDetailsForm = document.getElementById('moreDetailsForm')

let largeInfoWindowName = document.getElementById('largeInfoWindowName')
let largeInfoWindowYear = document.getElementById('largeInfoWindowYear')
let largeInfoWindowMass = document.getElementById('largeInfoWindowMass')
let largeInfoWindowDescription = document.getElementById('largeInfoWindowDescription')
let largeInfoWindowImg = document.getElementById('largeInfoWindowImg')
let largeInfoWindowYtLinks = document.getElementById('largeInfoWindowYtLinks')


moreDetailsForm.addEventListener('submit', (e) => {
	e.preventDefault()
	let elemId = moreDetailsForm.id.value
	let elementInfo = elements[elemId - 1]

    largeInfoWindowDescription.innerHTML = elementInfo.description
    largeInfoWindowImg.src = elementInfo.image
    largeInfoWindowName.innerText = elementboxName.innerText
    largeInfoWindowMass.innerText = infowindowmass.innerText
    largeInfoWindowYear.innerText = infowindowyear.innerText
    if (elementInfo.links[0]) {
        elementInfo.links.forEach(lnk => {
            let utubecode = lnk.replace('/watch?v=', '/embed/')
            let iframe = document.createElement('iframe')
            largeInfoWindowYtLinks.appendChild(iframe)
            let iframeOuterHtml = `
                <iframe src="${utubecode}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
            iframe.outerHTML = iframeOuterHtml
        })
    }
    fixedlargeinfowindow.classList.add('shown')
})
