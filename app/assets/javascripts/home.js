// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var SS = SS || {};

SS.Home = function() {
 this.initialize();
}
SS.Home.prototype = {
 initialize: function () {
    // alert("Hello");
   this.hideContainer();
   this.linkclickevent();
 },
	linkclickevent: function()
	{	
         $('#divIndex #dv_index #menu_school').click(function () {
              
              $('#divIndex').addClass('hidden');
              $('#dvSchool').removeClass('hidden');
              var schoolIndex=new SS.schoolIndex();
              
         });
    },
    hideContainer:function()
    {
        $('#allStudent').addClass('hidden');
        // $('#divIndex').addClass('hidden');
        $('#allTeacher').addClass('hidden');
        $('#allSubjectContainer').addClass('hidden');
        $('#allClassroom').addClass('hidden');
        $('#dvshowSchool').addClass('hidden');
        $('#subjectContainer').addClass('hidden');
        $('#editSchoolContainer').addClass('hidden');
        $('#newSchoolContainer').addClass('hidden');
        $('#dvSchool').addClass('hidden');
        $('#createClassroomContainer').addClass('hidden');
        $('#editClassroomContainer').addClass('hidden');
        $('#allTeacher').addClass('hidden');
        $('#createTeacherContainer').addClass('hidden');
        $('#editTeacherContainer').addClass('hidden');
        $('#editStudentContainer').addClass('hidden');
        $('#createStudentContainer').addClass('hidden');
        $('#allStudent').addClass('hidden');
        $('#allSubjectContainer').addClass('hidden');
        $('#subjectContainer').addClass('hidden');
    }

}
