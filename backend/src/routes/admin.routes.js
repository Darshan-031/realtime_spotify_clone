import { Router } from "express";
import {createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin,} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

//check user is admin or not
router.get("/check", checkAdmin);

//create songs and delete songs
router.post('/songs',  createSong);
router.delete('/songs/:id', deleteSong);

//create album and delete albums
router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;