class SubjectsController < ApplicationController
	def index
		@subjects=Subject.all
		respond_to do |format|
 		format.json { render :json => @subjects, :status => :ok}
		end
	end
	def show
		begin
		@subject=Subject.find(params[:id])
		respond_to do |format|
 		format.json { render :json => @subject, :status => :ok}
		end
		rescue => e
			p e.message
			respond_to do |format|
 			format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
			end
		end
	end
	def create
		begin
		@subject=Subject.new(subject_param)
		if @subject.save
			respond_to do |format|
 			format.json {render :json => @subject, :status  => :ok}
 			end
 		end
		rescue => e
			p e.message
			respond_to do |format|
 			format.json {render :json => {"error" => e.message}, :status =>:unprocessable_entity}
 			end
		end
	end
	def update
		begin
		@subject=Subject.find(params[:id])
		if @subject.update_attributes(subject_param)
			respond_to do |format|
				# format.html {render 'show'}
 				format.json {render :json => @subject, :status => :ok}
 			end
		end
		rescue => e
			p e.message
			respond_to do |format|
 			format.json {render :json => {"error" => e.message}, :status =>:unprocessable_entity}
 			end
		end
	end
	def destroy
		begin
		@subject=Subject.find(params[:id])
		if @subject.destroy
			@subjects = Subject.all
			respond_to do |format|
 			format.json {render :json => @subject, :status => :ok}
 			end
		end
		rescue => e
			p e.message
			respond_to do |format|
			@subjects = Subject.all
 			format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	private 
	def subject_param
		params.require(:subject).permit(:name)
	end
end
