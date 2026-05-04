import newsAPI from "../services/newsAPI";

class AchievementForm {
    constructor(global, utils) {
        this.achievementForm = document.querySelector('#achievement-form');

        this.global = global || {};
        this.utils = utils || {};

        console.log('GLOBAL:', this.global);
        console.log('UTILS:', this.utils);

        this._addEventListeners();
    }

    _addEventListeners() {
        this.achievementForm.addEventListener(
            'submit',
            this.handleSubmit.bind(this)
        );
    }

    async handleSubmit(e){
    e.preventDefault();

    const formData = new FormData(this.achievementForm);

    this.utils.showSpinner();

    const achievements = await newsAPI.postNews(
        formData,
        'achievements',
        this.global
    );

    this.utils.removeSpinner();

    this.achievementForm.reset();

    alert('Data submitted successfully');
}
}

export default AchievementForm;