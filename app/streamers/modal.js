import Image from "next/image";

export default function DGModal({name, dgs, setOpen}){
    return(
        <div id="modalBG">
            <div id="modal">
                <h2>Donations Goals de {name}</h2>
                <div id="dgImg">
                {
                    dgs.map(dg => (
                        <Image 
                            key={dg}
                            src={`/dgs/${dg}`}
                            alt={"Donation Goal"}
                            width={1200}
                            height={100}
                        />
                    ))
                }
                </div>
                <button id="closeModal" onClick={() => setOpen(false)}>Fermer X</button>
            </div>
        </div>
    )
}