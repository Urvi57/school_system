// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var SS = SS || {};

SS.Home = function() {
 this.initialize();
}

SS.Home.prototype = {
 initialize: function () {
    // alert("Hello");
   this.linkclickevent();
 },
	linkclickevent: function()
	{
		// $('#dvschool #dvchildschool #Create_School').click(function () {
  //            $('#dvindex').removeClass('hidden');
  //            $('#dvschool').addClass('hidden');
  //       })

        $('#divIndex #dv_index #menu_school').click(function () {
              
              $('#divIndex').addClass('hidden');
              $('#dvSchool').removeClass('hidden');
              var schoolIndex=new SS.schoolIndex()
              
        })
	}

}
;
