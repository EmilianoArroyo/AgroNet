$(document).ready(function() {
    trendArt();
    $('.search-bar').on('submit', (event) => {
        event.preventDefault(); 
        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation();
        }
        const profilesContainer = $('#profile-container')[0]; // Obtener el elemento DOM
        $(profilesContainer).empty();
        const searchTerm = $('.search-input').val()
        try {
            const url = `/api/searchProd?name=${encodeURIComponent(searchTerm)}`;
            $.ajax({
                type: "GET",
                url: url,
                contentType: false,
                processData: false,
                success: function (response) {
                    response.forEach(found => {
                        const artistaDiv = document.createElement("div");
                        artistaDiv.classList.add("col", "mb-4");
                
                        const card = document.createElement("div");
                        card.classList.add("card");
                
                        const artistImageContainer = document.createElement("div");
                        artistImageContainer.classList.add("artist-image-container");
                
                        const img = document.createElement("img");
                        img.src = `/uploads/${found.photo}`;
                        img.classList.add("card-img-top", "artist-image", "p-3", "mt-4");
                        img.alt = found.name;
                
                        const cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");
                
                        const h2 = document.createElement("h2");
                        h2.classList.add("card-title", "text-center");
                        h2.appendChild(document.createTextNode(found.name));
                
                        let p = document.createElement("p");
                        p.classList.add("card-text");
                        p.appendChild(document.createTextNode(found.productorName));
                        let p2 = document.createElement("p");
                        p2.classList.add("card-text");
                        p2.appendChild(document.createTextNode(found.descriptionProductor));
                        let p3 = document.createElement("p");
                        p3.classList.add("card-text");
                        p3.appendChild(document.createTextNode("Precio: " + found.precio + " " + found.por));
                
                        const a = document.createElement("a");
                        a.href = `/api/albums/show/spec/${found.productorId}?albumId=${found.productId}`;
                        a.classList.add("btn", "btn-custom");
                        a.id = found._id;
                        a.appendChild(document.createTextNode("Ver Perfil"));

                        artistImageContainer.appendChild(img);
                        cardBody.appendChild(h2);
                        cardBody.appendChild(p);
                        cardBody.appendChild(p2);
                        cardBody.appendChild(p3);
                        cardBody.appendChild(a);
                        card.appendChild(artistImageContainer);
                        card.appendChild(cardBody);
                        artistaDiv.appendChild(card);
                
                        profilesContainer.appendChild(artistaDiv);

                    });
                }, 
                error: function (error) {
                    const artistaDiv = document.createElement("div");
                    const errorMessage = document.createTextNode(`No se encontró ningún artista llamado "${searchTerm}"`);
                
                    const h2Element = document.createElement("h2");
                    h2Element.style.textAlign = "center";
                    h2Element.style.marginTop = "20px";
                    h2Element.style.overflow = "hidden";
                    h2Element.style.textOverflow = "ellipsis";
                    h2Element.style.whiteSpace = "nowrap";
                    h2Element.style.fontSize = "30px";
                
                    h2Element.appendChild(errorMessage);
                    artistaDiv.appendChild(h2Element);
                
                    profilesContainer.appendChild(artistaDiv);
                }
            });
        } catch (err) {
            
        }
    });
});

function trendArt() {
    $.ajax({
        type: "GET",
        url: `/api/show/artists`,
        success: function (response) {
            var cardContent = ''; // Contenedor para todas las cartas

            response.forEach(artist => {
                cardContent += `
                    <div class="col-md-3 mb-4"> <!-- Utilizando col-md-3 para que haya 4 columnas en pantallas medianas y grandes -->
                        <div class="card h-100">
                            <div class="artist-image-container">
                                <img src="/uploads/${artist.profilePhoto}" class="card-img-top artist-image p-3 mt-4 img-fluid" alt="Artista 1">
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h2 class="card-title text-center">${$('<div>').text(artist.name).html()}</h2>
                                <p class="card-text">${$('<div>').text(artist.genre).html()}</p>
                                <a href="/api/artist/public/${artist._id}" class="btn btn-custom mt-auto">Ver más</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Agregando todas las cartas al contenedor con la clase "row"
            $('#trnd').append('<div class="row">' + cardContent + '</div>');
        }
    });
}

