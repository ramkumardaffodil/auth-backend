class applicationController {
  createApllication(req, res) {
    res.json({ data: "get create application success" });
  }
  getAllApplication(req, res) {
    res.json({ data: "get all application success" });
  }
}

export default applicationController;
