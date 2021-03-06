import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountManagement = ( { userData } ) => {
	const axios = require('axios').default;
	axios.defaults.withCredentials = true;

	const [clients, setClients] = useState('');
	const [agencies, setAgencies] = useState('');
	const [moderators, setModerators] = useState('');
	const [refresh, setRefresh] = useState(false);
	const navigate = useNavigate();
	let clientList = [], agencyList = [], moderatorList = [];

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/client')
			.then(function (response) {
				setClients(response.data);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		axios
			.get('http://localhost:8080/api/agency')
			.then(function (response) {
				setAgencies(response.data);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		axios
			.get('http://localhost:8080/api/moderator')
			.then(function (response) {
				setModerators(response.data);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [refresh]);

	for (let i = 0; i < clients.length; i++) {
		if (clients[i] !== undefined) {
			clientList.push(
				<tr>
					<th scope='row' class='first-header'>{clients[i].idClient}</th>
					<td>{clients[i].nameUser}</td>
					<td>{clients[i].surName}</td>
					<td>{clients[i].dateOfBirth === null?"Nie podano":clients[i].dateOfBirth}</td>
					<td>{clients[i].phoneNumber === null?"Nie podano":clients[i].phoneNumber}</td>
					<td>{clients[i].numberAccountBank === null?"Nie podano":clients[i].numberAccountBank}</td>
					<td>
						{
							<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									ModifyAccount('client', clients[i].idClient);
								}}>
								Zmodyfikuj
							</button>
						}
					</td>
					<td>
						{
							<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									DeleteAccount('client', clients[i].idClient);
								}}>
								Usu??
							</button>
						}
					</td>
				</tr>
			);
		}
	}

	for (let i = 0; i < agencies.length; i++) {
		if (agencies[i] !== undefined) {
			console.log(agencies[i])
			agencyList.push(
				<tr>
					<th scope='row' class='first-header'>{agencies[i].idAgency}</th>
					<td>{agencies[i].nameCompany}</td>
					<td>{agencies[i].nip}</td>
					<td>{agencies[i].numberPhone}</td>
					<td>
						{
							<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									ModifyAccount('agency', agencies[i].idAgency);
								}}>
								Zmodyfikuj
							</button>
						}
					</td>
					<td>
						<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									DeleteAccount('agency', agencies[i].idAgency);
								}}>
								Usu??
							</button>
					</td>
				</tr>
			);
		}
	}

	for (let i = 0; i < moderators.length; i++) {
		if (moderators[i] !== undefined) {
			moderatorList.push(
				<tr>
					<th scope='row' class='first-header'>{moderators[i].idModerator}</th>
					<td>{moderators[i].userNameModerator}</td>
					<td>
						{
							<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									ModifyAccount('moderator', moderators[i].idModerator);
								}}>
								Zmodyfikuj
							</button>
						}
					</td>
					<td>
						{moderators[i].idModerator == userData.idRole?
							"Nie mo??na usun???? w??asnego konta!"
							:
							<button
								type='button'
								class='btn btn-primary'
								onClick={() => {
									DeleteAccount('moderator', moderators[i].idModerator);
								}}>
								Usu??
							</button>
						}
					</td>
				</tr>
			);
		}
	}

	const ModifyAccount = (type, id) => {
		const axios = require('axios').default;
		axios.defaults.withCredentials = true;

		let data;
		if(type === "client") {
			axios
				.get('http://localhost:8080/api/client/' + id)
				.then(function (response) {
					data = {
						idRole: response.data.idClient,
						role: "ROLE_CLIENT",
					};
					
					axios
					.get('http://localhost:8080/api/client/issocial/' + id)
					.then(function (response2) {
						if(response2.data === true) {
							data = {
								idRole: response.data.idClient,
								role: "ROLE_CLIENT_FACEBOOK",
							};
						}

						navigate("/client/changedata", { state: { data } } );
					})
					.catch(function (error) {
						console.log(error);
					});
				})
				.catch(function (error) {
					console.log(error);
				});

				
		}
		else if(type === "agency") {
			axios
				.get('http://localhost:8080/api/agency/' + id)
				.then(function (response) {
					data = {
						idRole: response.data.idAgency,
						role: "ROLE_AGENCY",
					};

					navigate("/agency/changedata",  { state: { data } } );
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		else if(type === "moderator") {
			axios
				.get('http://localhost:8080/api/moderator/' + id)
				.then(function (response) {
					data = {
						idRole: response.data.idModerator,
						role: "ROLE_MODERATOR",
					};

					navigate("/moderator/changedata", { state: { data } } );
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	const DeleteAccount = (type, id) => {
		if(type === "client") {
			axios
			.delete('http://localhost:8080/api/client/' + id)
			.then(function (response) {
				console.log(response);
				setRefresh(refresh ? false : true);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		else if(type === "agency") {
			axios
			.delete('http://localhost:8080/api/agency/' + id)
			.then(function (response) {
				console.log(response);
				setRefresh(refresh ? false : true);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		else if(type === "moderator") {
			axios
			.delete('http://localhost:8080/api/moderator/' + id)
			.then(function (response) {
				console.log(response);
				setRefresh(refresh ? false : true);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};

	const clientsRender = clients.length !== 0 ? 
    <div>
        <br/><br/>
        <h2>ZARZ??DZANIE KLIENTAMI</h2>
        <br/><br/>
        <table class="table table-light">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Imi??</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Data urodzenia</th>
					<th scope="col">Numer telefonu</th>
					<th scope="col">Numer konta bankowego</th>
					<th scope="col">Zmodyfikuj</th>
					<th scope="col">Usu??</th>
                </tr>
            </thead>
            <tbody>
                {clientList}
            </tbody>
        </table>
    </div>
    :
    <div>
        <br/><br/>
        <h2>ZARZ??DZANIE KLIENTAMI</h2>
        <br/><br/>
        <text>W systemie nie ma ??adnych kont klient??w.</text>
    </div>;

	const agenciesRender = agencies.length !== 0 ? 
	<div>
		<br/><br/>
		<h2>ZARZ??DZANIE AGENCJAMI</h2>
		<br/><br/>
		<table class="table table-light">
			<thead class="thead-dark">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nazwa agencji</th>
					<th scope="col">NIP</th>
					<th scope="col">Numer telefonu</th>
					<th scope="col">Zmodyfikuj</th>
					<th scope="col">Usu??</th>
				</tr>
			</thead>
			<tbody>
				{agencyList}
			</tbody>
		</table>
	</div>
	:
	<div>
		<br/><br/>
		<h2>ZARZ??DZANIE AGENCJAMI</h2>
		<br/><br/>
		<text>W systemie nie ma ??adnych kont agencji.</text>
	</div>;

	const moderatorsRender = moderators.length !== 0 ? 
	<div>
		<br/><br/>
		<h2>ZARZ??DZANIE MODERATORAMI</h2>
		<br/><br/>
		<table class="table table-light">
			<thead class="thead-dark">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nazwa moderatora</th>
					<th scope="col">Zmodyfikuj</th>
					<th scope="col">Usu??</th>
				</tr>
			</thead>
			<tbody>
				{moderatorList}
			</tbody>
		</table>
	</div>
	:
	<div>
		<br/><br/>
		<h2>ZARZ??DZANIE MODERATORAMI</h2>
		<br/><br/>
		<text>W systemie nie ma ??adnych kont moderator??w.</text>
	</div>;

	return (
		<div className='parentMenu'>
            {clientsRender}
			{agenciesRender}
			{moderatorsRender}
        </div>
	);
};

export default AccountManagement;
