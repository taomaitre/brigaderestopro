import React, { useEffect, useRef, useState } from "react";

// Sur un ordinateur, le navigateur ignore "capture" et ouvre l'explorateur de fichiers au lieu de
// l'appareil photo. Ce composant intercepte ce clic (sur ordinateur seulement) et ouvre la webcam à la
// place ; la photo prise est remise dans le champ fichier d'origine, comme si elle venait du téléphone.
// Sur téléphone/tablette, rien ne change : l'appareil photo natif s'ouvre déjà tout seul.
const EST_MOBILE = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");

export default function CameraWebHost() {
  const [champ, setChamp] = useState(null);
  const [erreur, setErreur] = useState(null);
  const videoRef = useRef(null);
  const flux = useRef(null);
  const contournement = useRef(false);

  useEffect(() => {
    if (EST_MOBILE) return undefined;
    const onClick = (e) => {
      const t = e.target;
      if (!t || t.tagName !== "INPUT" || t.type !== "file" || !t.hasAttribute("capture")) return;
      if (contournement.current) { contournement.current = false; return; }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
      e.preventDefault();
      setErreur(null);
      setChamp(t);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const arreter = () => { if (flux.current) { flux.current.getTracks().forEach((tr) => tr.stop()); flux.current = null; } };
  const fermer = () => { arreter(); setChamp(null); };

  useEffect(() => {
    if (!champ) return undefined;
    let annule = false;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 } }, audio: false })
      .then((s) => {
        if (annule) { s.getTracks().forEach((tr) => tr.stop()); return; }
        flux.current = s;
        if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play().catch(() => {}); }
      })
      .catch(() => setErreur("Impossible d'ouvrir l'appareil photo de cet ordinateur (aucune caméra, ou accès refusé dans le navigateur)."));
    return () => { annule = true; arreter(); };
  }, [champ]);

  const prendre = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    c.toBlob((blob) => {
      if (!blob || !champ) return;
      const fichier = new File([blob], "photo-" + Date.now() + ".jpg", { type: "image/jpeg" });
      const dt = new DataTransfer();
      dt.items.add(fichier);
      champ.files = dt.files;
      champ.dispatchEvent(new Event("change", { bubbles: true }));
      fermer();
    }, "image/jpeg", 0.9);
  };

  const choisirFichier = () => {
    const c = champ;
    fermer();
    if (c) { contournement.current = true; c.click(); }
  };

  if (!champ) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}>
      {erreur
        ? <p style={{ color: "#fff", maxWidth: 420, textAlign: "center", marginBottom: 16 }}>{erreur}</p>
        : <video ref={videoRef} playsInline muted style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 12, background: "#000" }} />}
      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {!erreur && <button onClick={prendre} style={{ background: "#C1432D", color: "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 600 }}>📷 Prendre la photo</button>}
        <button onClick={choisirFichier} style={{ background: "#fff", color: "#222", padding: "12px 18px", borderRadius: 10 }}>Choisir un fichier</button>
        <button onClick={fermer} style={{ background: "transparent", color: "#fff", padding: "12px 18px", borderRadius: 10, border: "1px solid #fff" }}>Annuler</button>
      </div>
    </div>
  );
}
