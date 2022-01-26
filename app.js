function displayResult(result) {
	let resultText = $('#result-text');
	resultText.val(result);
	$('#result-text').removeClass('text-area-red');
	$('#result-text').addClass('text-area-green');
}

function getConversion(userInput, inputRadioValue, outputRadioValue) {
	return parseInt(userInput, inputRadioValue)
		.toString(outputRadioValue)
		.toUpperCase();
}

function showError() {
	$('#copy-message').hide();
	$('#fail-message').hide().fadeIn();
	setTimeout(() => $('#fail-message').fadeOut(), 3000);
	$('#result-text').val('');
	$('#result-text').removeClass('text-area-green');
}

function isValidRadio(radio) {
	for (i = 0; i < radio.length; i++) {
		if (radio[i].checked) return true;
	}

	return false;
}

function checkEachNumber(userInput, numberSystem) {
	for (let i = 0; i < userInput.length; i++) {
		if (userInput.charAt(i) == '-' && i == 0) {
			continue;
		}
		if (!numberSystem.includes(userInput.charAt(i))) return false;
	}

	return true;
}

function isValidInput(userInput, inputRadio) {
	if (userInput == '') return false;

	const decimal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const binary = ['0', '1'];
	const octal = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
	const hexa = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
	];

	if (inputRadio == 10) {
		return checkEachNumber(userInput, decimal);
	} else if (inputRadio == 2) {
		return checkEachNumber(userInput, binary);
	} else if (inputRadio == 8) {
		return checkEachNumber(userInput, octal);
	} else {
		return checkEachNumber(userInput, hexa);
	}
}

function convert() {
	const userInput = $('#input').val().toUpperCase().trim();
	const inputRadio = $('input[name="inputradio"]');
	const outputRadio = $('input[name="outputradio"]');
	const selectedInputRadio = $('input[name="inputradio"]:checked').val();
	const selectedOutputRadio = $('input[name="outputradio"]:checked').val();

	if (
		isValidInput(userInput, selectedInputRadio) &&
		isValidRadio(inputRadio) &&
		isValidRadio(outputRadio)
	) {
		const result = getConversion(
			userInput,
			selectedInputRadio,
			selectedOutputRadio
		);
		displayResult(result);
	} else {
		showError();
	}
}

function copy() {
	let resultText = $('#result-text');
	if (resultText.val() != '') {
		resultText.select();

		document.execCommand('copy');

		$('#fail-message').hide();
		$('#copy-message').hide().fadeIn();
		setTimeout(() => $('#copy-message').fadeOut(), 3000);
	}
}

function resetField() {
	const userInput = $('#input');
	const inputRadio = $('input[name="inputradio"]');
	const outputRadio = $('input[name="outputradio"]');
	let resultText = $('#result-text');

	userInput.val('');

	for (let i = 0; i < inputRadio.length; i++) {
		inputRadio[i].checked = false;
	}
	for (let i = 0; i < outputRadio.length; i++) {
		outputRadio[i].checked = false;
	}

	$('#result-text').removeClass('text-area-green');

	resultText.val('');
}
